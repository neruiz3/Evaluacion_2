package com.example.solicitud_service.service;

import com.example.solicitud_service.DTO.CostoDTO;
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

    private double calcularCuotaMensual(int plazo, double tasaInteres, double monto) {
        int n = plazo * 12; // numero total de pagos
        double r = tasaInteres / 12.0 / 100.0; //tasa de interes mensual
        double p = monto;
        // M = P[r(1+r)^n]/[(1+r)^n-1]
        return ((p * r * Math.pow((1 + r), n)) / (Math.pow((1 + r), n) - 1));
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

    public CostoDTO calculaCostoTotal (SolicitudEntity credito){
        //calculo cuota mensual, que ya deberia estar calculada porque nada mas crearlo se hace
        CostoDTO costos = new CostoDTO();
        costos.setCuotaMensual(credito.getCuotaMensual());
        costos.setSeguroDesgravamen(credito.getMonto()*0.03);
        costos.setComisionAdmin(credito.getMonto()*0.01);
        Double costoMensual = costos.getCuotaMensual()+ costos.getSeguroDesgravamen()+costos.getSeguroIncendio();
        costos.setCostoMensual(costoMensual);
        double costoTotal = costoMensual*12+ costos.getComisionAdmin();
        costos.setCostoTotal(costoTotal);
        return costos;
    }

    public SolicitudEntity cambioEstado(Long id, Estado nuevoEstado){
        SolicitudEntity credito = solicitudRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Crédito no encontrado con ID: " + id));

        if (!transicionPermitida(credito.getEstado(), nuevoEstado)) {
            throw new IllegalStateException("Cambio de estado no permitido desde " + credito.getEstado() + " a " + nuevoEstado);
        }

        credito.setEstado(nuevoEstado);
        return solicitudRepository.save(credito);
    }

    private boolean transicionPermitida(Estado estadoActual, Estado nuevoEstado) {
        if (estadoActual == Estado.EN_REVISION_INICIAL && nuevoEstado == Estado.PENDIENTE_DOCUMENTACION) return true;
        if (estadoActual == Estado.EN_REVISION_INICIAL && nuevoEstado == Estado.EN_EVALUACION) return true;
        if (estadoActual == Estado.PENDIENTE_DOCUMENTACION && nuevoEstado == Estado.EN_EVALUACION) return true;
        if (estadoActual == Estado.EN_EVALUACION && nuevoEstado == Estado.PENDIENTE_DOCUMENTACION) return true;
        if (estadoActual == Estado.EN_EVALUACION && nuevoEstado == Estado.PRE_APROBADA) return true;
        if (estadoActual == Estado.EN_EVALUACION && nuevoEstado == Estado.RECHAZADA) return true;
        if (estadoActual == Estado.PRE_APROBADA && nuevoEstado == Estado.EN_APROBACION_FINAL) return true;
        if (estadoActual == Estado.EN_APROBACION_FINAL && nuevoEstado == Estado.APROBADA) return true;
        if (estadoActual == Estado.APROBADA && nuevoEstado == Estado.EN_DESEMBOLSO) return true;

        return nuevoEstado == Estado.CANCELADA_POR_CLIENTE;
    }

}