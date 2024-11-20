package com.example.seguimiento_service.service;

import com.example.seguimiento_service.Estado;
import com.example.seguimiento_service.entity.SeguimientoEntity;
import com.example.seguimiento_service.model.Evaluacion;
import com.example.seguimiento_service.repository.SeguimientoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SeguimientoService{
    @Autowired
    SeguimientoRepository seguimientoRepository;
    @Autowired
    RestTemplate restTemplate;

    public ArrayList<SeguimientoEntity> getCreditosCliente(String rut){
        return (ArrayList<SeguimientoEntity>) seguimientoRepository.findByRut(rut);
    }

    public SeguimientoEntity getCreditoSolicitud(Long idSolicitud) {
        return seguimientoRepository.findByIdSolicitud(idSolicitud);
    }

    public SeguimientoEntity nuevoSeguimiento(SeguimientoEntity credito){
        return seguimientoRepository.save(credito);
    }

    public SeguimientoEntity cambioEstado(Long idSolicitud, Estado nuevoEstado){
        SeguimientoEntity credito = seguimientoRepository.findByIdSolicitud(idSolicitud);
        if (!transicionPermitida(credito.getEstado(), nuevoEstado)) {
            throw new IllegalStateException("Cambio de estado no permitido desde " + credito.getEstado() + " a " + nuevoEstado);
        }
        credito.setEstado(nuevoEstado);
        return seguimientoRepository.save(credito);
    }

    public Evaluacion actualizaEvaluacion(SeguimientoEntity credito){
        Evaluacion actualizacion = restTemplate.getForObject("http://evaluacion-service/api/v1/evaluacion/idSolicitud/" + credito.getIdSolicitud(), Evaluacion.class);
        actualizacion.setEstado(credito.getEstado());
        HttpEntity<Evaluacion> request = new HttpEntity<Evaluacion>(actualizacion);
        Evaluacion actualiza = restTemplate.postForObject("http://evaluacion-service/api/v1/evaluacion/", request, Evaluacion.class);
        return actualiza;
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

