package com.example.solicitud_service.service;

import com.example.solicitud_service.DTO.CostoDTO;
import com.example.solicitud_service.DTO.TipoPrestamoDTO;
import com.example.solicitud_service.Estado;
import com.example.solicitud_service.TipoPrestamo;
import com.example.solicitud_service.entity.SolicitudEntity;
import com.example.solicitud_service.model.Evaluacion;
import com.example.solicitud_service.model.Seguimiento;
import com.example.solicitud_service.model.Usuario;
import com.example.solicitud_service.repository.SolicitudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SolicitudService {
    @Autowired
    SolicitudRepository solicitudRepository;
    @Autowired
    RestTemplate restTemplate;

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
        solicitud.setCuotaMensual(calcularCuotaMensual(solicitud.getPlazo(), solicitud.getTasaInteres(), solicitud.getMonto()));
        return solicitudRepository.save(solicitud);
    }

    public Evaluacion creaEvaluacion(SolicitudEntity solicitud) {
        Evaluacion evaluacion = new Evaluacion();
        evaluacion.setIdSolicitud(solicitud.getId());
        evaluacion.setRut(solicitud.getRut());
        evaluacion.setPlazo(solicitud.getPlazo());
        evaluacion.setTasaInteres(solicitud.getTasaInteres());
        evaluacion.setMonto(solicitud.getMonto());
        evaluacion.setTipoPrestamo(solicitud.getTipoPrestamo());
        evaluacion.setValorPropiedad(solicitud.getValorPropiedad());
        evaluacion.setCuotaMensual(solicitud.getCuotaMensual());
        evaluacion.setEstado(Estado.EN_REVISION_INICIAL);
        HttpEntity<Evaluacion> request = new HttpEntity<Evaluacion>(evaluacion);
        Evaluacion nuevaEvaluacion = restTemplate.postForObject("http://evaluacion-service/api/v1/evaluacion/", request, Evaluacion.class);
        return nuevaEvaluacion;
    }

    public Seguimiento creaSeguimiento(SolicitudEntity solicitud) {
        Seguimiento seguimiento = new Seguimiento();
        seguimiento.setIdSolicitud(solicitud.getId());
        seguimiento.setRut(solicitud.getRut());
        seguimiento.setTipoPrestamo(solicitud.getTipoPrestamo());
        seguimiento.setEstado(Estado.EN_REVISION_INICIAL);
        HttpEntity<Seguimiento> request = new HttpEntity<Seguimiento>(seguimiento);
        Seguimiento nuevoSeguimiento = restTemplate.postForObject("http://seguimiento-service/api/v1/seguimiento/", request, Seguimiento.class);
        return nuevoSeguimiento;
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

    public boolean eliminaCredito(Long id) throws Exception {
        try{
            solicitudRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

}