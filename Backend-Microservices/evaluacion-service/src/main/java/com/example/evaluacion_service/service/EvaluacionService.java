package com.example.evaluacion_service.service;

import com.example.evaluacion_service.DTO.TipoPrestamoDTO;
import com.example.evaluacion_service.Estado;
import com.example.evaluacion_service.TipoPrestamo;
import com.example.evaluacion_service.entity.EvaluacionEntity;
import com.example.evaluacion_service.model.Credito;
import com.example.evaluacion_service.model.Seguimiento;
import com.example.evaluacion_service.model.Usuario;
import com.example.evaluacion_service.repository.EvaluacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EvaluacionService {
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private EvaluacionRepository evaluacionRepository;

    public ArrayList<EvaluacionEntity> getEvaluaciones() {
        return (ArrayList<EvaluacionEntity>) evaluacionRepository.findAll();
    }

    public EvaluacionEntity getCredito(Long id) {
        return evaluacionRepository.findById(id).get();
    }

    public EvaluacionEntity getCreditoSolicitud(Long idSolicitud) {
        return evaluacionRepository.findByIdSolicitud(idSolicitud);
    }

    public EvaluacionEntity creaEvaluacion (EvaluacionEntity nuevaEvaluacion) {
        return evaluacionRepository.save(nuevaEvaluacion);
    }

    public EvaluacionEntity revisionInicial(EvaluacionEntity credito) {
        //verificar que se han completado los campos y adjuntado los documentos necesarios
        //vamos a coger un cliente para poder evaluar eso, ya que dicha informacion esta en los clientes.
        Usuario cliente = restTemplate.getForObject("http://usuario-service/api/v1/cliente/rut/" + credito.getRut(), Usuario.class);

        if (compruebaCampos(cliente)) {
            if (compruebaDocumentos(credito.getTipoPrestamo(), cliente)) {
                credito.setEstado(Estado.EN_EVALUACION);
            } else {
                credito.setEstado(Estado.PENDIENTE_DOCUMENTACION);
            }
        } else {
            credito.setEstado(Estado.PENDIENTE_DOCUMENTACION);
        }
        return evaluacionRepository.save(credito);
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

    public EvaluacionEntity evaluacionCredito (EvaluacionEntity credito){
        System.out.println("Credito: " + credito.getTipoPrestamo().name());
        Usuario cliente = restTemplate.getForObject("http://usuario-service/api/v1/cliente/rut/" + credito.getRut(), Usuario.class);

        double cuotaIngreso = credito.getCuotaMensual()/cliente.getIngresos()*100.0;
        if(cuotaIngreso > 35.0){
            credito.setEstado(Estado.RECHAZADA);
            return evaluacionRepository.save(credito);
        }
        if(cliente.getEsMoroso()){
            credito.setEstado(Estado.RECHAZADA);
            return evaluacionRepository.save(credito);
        }
        if(cliente.getEsIndependiente()){
            if(!cliente.getEsEstable()){
                credito.setEstado(Estado.RECHAZADA);
                return evaluacionRepository.save(credito);
            }
        }
        else{
            if(cliente.getAntiguedadLaboral()<1){
                credito.setEstado(Estado.RECHAZADA);
                return evaluacionRepository.save(credito);
            }
        }
        double deuda = cliente.getDeudaTotal()+credito.getCuotaMensual();
        if(deuda > 0.5*cliente.getIngresos()){
            credito.setEstado(Estado.RECHAZADA);
            return evaluacionRepository.save(credito);
        }
        if(!(validacion(credito))){
            credito.setEstado(Estado.RECHAZADA);
            return evaluacionRepository.save(credito);
        }
        int edadFutura = cliente.getEdad()+credito.getPlazo();
        if(edadFutura>70){
            credito.setEstado(Estado.RECHAZADA);
            return evaluacionRepository.save(credito);
        }
        //capacidad de ahorro
        int requisitos = calculaCapacidadAhorro(cliente,credito);
        //evaluamos los requisitos
        if(requisitos == 5){
            cliente.setCapacidadAhorro("solida"); //continuar con la evaluacion
            credito.setEstado(Estado.PRE_APROBADA);
        } else if (requisitos < 3) {
            cliente.setCapacidadAhorro("insuficiente"); //revision adicional
            credito.setEstado(Estado.RECHAZADA);
        } else {
            cliente.setCapacidadAhorro("moderada"); //rechazar
            credito.setEstado(Estado.EN_EVALUACION);
        }
        HttpEntity<Usuario> request = new HttpEntity<Usuario>(cliente);
        Usuario actualizaCliente = restTemplate.postForObject("http://usuario-service/api/v1/cliente/", request, Usuario.class);
        return evaluacionRepository.save(credito);
    }

    public Seguimiento actualizaSeguimiento(EvaluacionEntity credito){
        Seguimiento actualizacion = restTemplate.getForObject("http://seguimiento-service/api/v1/seguimiento/idSolicitud/" + credito.getIdSolicitud(), Seguimiento.class);
        actualizacion.setEstado(credito.getEstado());
        HttpEntity<Seguimiento> request = new HttpEntity<Seguimiento>(actualizacion);
        Seguimiento actualiza = restTemplate.postForObject("http://seguimiento-service/api/v1/seguimiento/", request, Seguimiento.class);
        return actualiza;
    }

    private int calculaCapacidadAhorro(Usuario cliente, EvaluacionEntity credito){
        int requisitos = 0;

        //saldo minimo
        if (cliente.getSaldo()>=0.1*credito.getMonto()){
            requisitos++;
        }
        //historial de ahorro  --> saldo positivo en su cuenta de ahorros durante los últimos 12 meses
        //sin retiros > 50% del saldo.
        if(cliente.getSaldoPositivo()){
            if(cliente.getMayorRetiro12()<cliente.getSaldo()*0.5){
                requisitos++;
            }
        }
        //depositos periodicos
        if(cliente.getDepositoRegular()){
            if(cliente.getTotalDepositos()>=0.05*cliente.getIngresos()){
                requisitos++;
            }
        }
        //relacion saldo/años de antiguedad
        double porcentaje = 0.1;
        if(cliente.getTiempoCuentaAhorros()<2){
            porcentaje = 0.2;
        }
        if(cliente.getSaldo()>credito.getMonto()*porcentaje){
            requisitos++;
        }
        //retiros recientes, no se si habria que hacerlo asi o obteniendo de una base de datos los retiros
        if((cliente.getMayorRetiro6()<= cliente.getSaldo()*0.3)) {
            requisitos++;
        }
        return requisitos;
    }

    public boolean validacion(EvaluacionEntity simulacion) {
        // Validar el plazo
        if (simulacion.getPlazo() > simulacion.getTipoPrestamo().getPlazoMaximo()) {
            //throw new IllegalArgumentException("El plazo excede el máximo permitido para este tipo de préstamo.");
            return false;
        }
        // Validar la tasa de interés
        if (simulacion.getTasaInteres() < simulacion.getTipoPrestamo().getTasaInteresMinima()
                || simulacion.getTasaInteres() > simulacion.getTipoPrestamo().getTasaInteresMaxima()) {
            //throw new IllegalArgumentException("La tasa de interés está fuera del rango permitido.");
            return false;
        }
        // Validar el monto
        double montoMax = simulacion.getValorPropiedad()*(simulacion.getTipoPrestamo().getMontoMaximo() / 100.0);
        if (simulacion.getMonto() > montoMax) {
            //throw new IllegalArgumentException("El monto solicitado excede el máximo permitido para este tipo de préstamo.");
            return false;
        }

        return true;
    }

    public EvaluacionEntity cambioEstado(Long id, Estado nuevoEstado){
        EvaluacionEntity credito = evaluacionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Crédito no encontrado con ID: " + id));

        if (!transicionPermitida(credito.getEstado(), nuevoEstado)) {
            throw new IllegalStateException("Cambio de estado no permitido desde " + credito.getEstado() + " a " + nuevoEstado);
        }

        credito.setEstado(nuevoEstado);
        return evaluacionRepository.save(credito);
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

    public boolean eliminaCredito(Long id) throws Exception {
        try{
            evaluacionRepository.deleteById(id);
            restTemplate.delete("http://api/v1/credito/" + id);
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