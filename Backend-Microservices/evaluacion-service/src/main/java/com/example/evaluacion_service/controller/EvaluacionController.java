package com.example.evaluacion_service.controller;

import com.example.evaluacion_service.DTO.TipoPrestamoDTO;
import com.example.evaluacion_service.Estado;
import com.example.evaluacion_service.entity.EvaluacionEntity;
import com.example.evaluacion_service.model.Seguimiento;
import com.example.evaluacion_service.service.EvaluacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/evaluacion")
public class EvaluacionController {

    @Autowired
    EvaluacionService evaluacionService;

    @GetMapping("/")
    public ResponseEntity<List<EvaluacionEntity>> listaCreditos() {
        List<EvaluacionEntity> evaluaciones = evaluacionService.getEvaluaciones();
        if (evaluaciones.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(evaluaciones);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<EvaluacionEntity> getCreditoId(@PathVariable Long id) {
        EvaluacionEntity credito = evaluacionService.getCredito(id);
        return ResponseEntity.ok(credito);
    }

    @GetMapping("/idSolicitud/{idSolicitud}")
    public ResponseEntity<EvaluacionEntity> getCreditoIdSolicitud(@PathVariable Long idSolicitud) {
        EvaluacionEntity credito = evaluacionService.getCreditoSolicitud(idSolicitud);
        return ResponseEntity.ok(credito);
    }

    @PostMapping("/")
    public ResponseEntity<EvaluacionEntity> nuevaEvaluacion(@RequestBody EvaluacionEntity evaluacion) {
        EvaluacionEntity nuevaEvaluacion = evaluacionService.creaEvaluacion(evaluacion);
        return ResponseEntity.ok(nuevaEvaluacion);
    }

    @PutMapping("/revisaInicial")
    public ResponseEntity<EvaluacionEntity> revisionInicial(@RequestBody EvaluacionEntity credito) {
        EvaluacionEntity creditoRevisadoInicial = evaluacionService.revisionInicial(credito);
        Seguimiento actualizacion = evaluacionService.actualizaSeguimiento(creditoRevisadoInicial);
        return ResponseEntity.ok(creditoRevisadoInicial);
    }

    @PutMapping("/evaluar")
    public ResponseEntity<EvaluacionEntity> evaluaCredito(@RequestBody EvaluacionEntity credito) {
        EvaluacionEntity creditoEvaluado = evaluacionService.evaluacionCredito(credito);
        Seguimiento actualizacion = evaluacionService.actualizaSeguimiento(creditoEvaluado);
        return ResponseEntity.ok(creditoEvaluado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EvaluacionEntity> cambioEstado(@PathVariable Long id, @RequestBody Estado estado) {
        EvaluacionEntity creditoAprobado = evaluacionService.cambioEstado(id, estado);
        Seguimiento actualizacion = evaluacionService.actualizaSeguimiento(creditoAprobado);
        return ResponseEntity.ok(creditoAprobado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> eliminaId(@PathVariable Long id) throws Exception {
        var isDeleted = evaluacionService.eliminaCredito(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/tipo-prestamo")
    public List<TipoPrestamoDTO> obtenerTiposPrestamo() {
        List<TipoPrestamoDTO> prestamos = evaluacionService.obtenerTiposPrestamo();
        return prestamos;
    }
}

