package com.example.solicitud_service.service;

import com.example.solicitud_service.DTO.TipoPrestamoDTO;
import com.example.solicitud_service.Estado;
import com.example.solicitud_service.TipoPrestamo;
import com.example.solicitud_service.entity.SolicitudEntity;
import com.example.solicitud_service.model.Usuario;
import com.example.solicitud_service.repository.SolicitudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SolicitudService {
    @Autowired
    SolicitudRepository solicitudRepository;
    @Autowired
    private RestTemplate restTemplate;

    public ArrayList<SolicitudEntity> getCreditos() {
        return (ArrayList<SolicitudEntity>) solicitudRepository.findAll();
    }

    public ArrayList<SolicitudEntity> getCreditosCliente(String rut) {
        return (ArrayList<SolicitudEntity>) solicitudRepository.findByRut(rut);
    }

    public SolicitudEntity getCredito(Long id) {
        return solicitudRepository.findById(id).get();
    }

    public SolicitudEntity creaExpediente(SolicitudEntity solicitud) {
        solicitud.setEstado(Estado.EN_REVISION_INICIAL);
        solicitud.setCuotaMensual(calcularCuotaMensual(solicitud.getPlazo(), solicitud.getTasaInteres(), solicitud.getMonto()));
        return solicitudRepository.save(solicitud);
    }

    public SolicitudEntity revisionInicial(SolicitudEntity credito) {
        //verificar que se han completado los campos y adjuntado los documentos necesarios
        //vamos a coger un cliente para poder evaluar eso, ya que dicha informacion esta en los clientes.
        Usuario cliente = restTemplate.getForObject("http://api/v1/cliente", Usuario.class);

        if (compruebaCampos(cliente)) {
            if (compruebaDocumentos(credito.getTipoPrestamo(), cliente)) {
                credito.setEstado(Estado.EN_EVALUACION);
            } else {
                credito.setEstado(Estado.PENDIENTE_DOCUMENTACION);
            }
        } else {
            credito.setEstado(Estado.PENDIENTE_DOCUMENTACION);
        }
        return solicitudRepository.save(credito);
    }

    private Boolean compruebaCampos(Usuario cliente) {
        Boolean camposCompletos = false;

        camposCompletos = cliente.getIngresos() != null &&
                cliente.getEsMoroso() != null &&
                cliente.getEsIndependiente() != null &&
                cliente.getDeudaTotal() != null &&
                cliente.getSaldo() != null &&
                cliente.getMayorRetiro12() != null &&
                cliente.getSaldoPositivo() != null &&
                cliente.getTiempoCuentaAhorros() != null &&
                cliente.getMayorRetiro6() != null &&
                cliente.getDepositoRegular() != null;

        if (cliente.getEsIndependiente() != null) {
            if (cliente.getEsIndependiente() && cliente.getEsEstable() == null) {
                return false;
            }
            if ((!cliente.getEsIndependiente()) && cliente.getAntiguedadLaboral() == null) {
                return false;
            }
        }
        if (cliente.getSaldoPositivo() != null) {
            if (cliente.getSaldoPositivo() && cliente.getTotalDepositos() == null) {
                return false;
            }
        }
        return camposCompletos;
    }

    private boolean compruebaDocumentos(TipoPrestamo tipoPrestamo, Usuario cliente) {

        if (cliente.getComprobanteIngresos() == null || cliente.getCertificadoAvaluo() == null ||
                cliente.getCuentaAhorros() == null || cliente.getFotocopiaRut() == null ||
                cliente.getInformeDeudas() == null || cliente.getCertificadoAntiguedadLaboral() == null) {
            return false;
        }
        switch (tipoPrestamo) {
            case PRIMERAVIVIENDA -> {
                if (cliente.getHistorialCrediticio() != null) {
                    return true;
                }
            }
            case SEGUNDAVIVIENDA -> {
                if (cliente.getEscrituraVivienda() != null && cliente.getHistorialCrediticio() != null) {
                    return true;
                }
            }
            case COMERCIAL -> {
                if (cliente.getPlanNegocio() != null && cliente.getEstadoNegocio() != null) {
                    return true;
                }
            }
            case REMODELACION -> {
                if (cliente.getPresupuestoRemodelacion() != null) {
                    return true;
                }
            }
        }
        return false;
    }

    private double calcularCuotaMensual(int plazo, double tasaInteres, double monto) {
        int n = plazo * 12; // numero total de pagos
        double r = tasaInteres / 12.0 / 100.0; //tasa de interes mensual
        double p = monto;
        // M = P[r(1+r)^n]/[(1+r)^n-1]
        return ((p * r * Math.pow((1 + r), n)) / (Math.pow((1 + r), n) - 1));
    }

    public boolean eliminaCredito(Long id) throws Exception {
        try {
            solicitudRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public List<TipoPrestamoDTO> obtenerTiposPrestamo() {
        return List.of(TipoPrestamo.values()).stream()
                .map(this::mapearEnumADTO)
                .collect(Collectors.toList());
    }

    private TipoPrestamoDTO mapearEnumADTO(TipoPrestamo tipo) {
        return new TipoPrestamoDTO(
                tipo.name(),
                tipo.getPlazoMaximo(),
                tipo.getMontoMaximo(),
                tipo.getTasaInteresMinima(),
                tipo.getTasaInteresMaxima(),
                tipo.isComprobanteIngreso(),
                tipo.isCertificadoAvaluo(),
                tipo.isHistorialCrediticio(),
                tipo.isEscrituraVivienda(),
                tipo.isEstadoFinanciero(),
                tipo.isPlanNegocios(),
                tipo.isPresupuestoRemodelacion()
        );
    }
}