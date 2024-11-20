package com.example.seguimiento_service.controller;


import com.example.seguimiento_service.Estado;
import com.example.seguimiento_service.entity.SeguimientoEntity;
import com.example.seguimiento_service.model.Evaluacion;
import com.example.seguimiento_service.service.SeguimientoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/seguimiento")
public class SeguimientoController {

    @Autowired
    SeguimientoService seguimientoService;

    //funcion para solicitar el credito: primero hay que crear un expediente para cada credito
    @PostMapping("/")
    public ResponseEntity<SeguimientoEntity> nuevo(@RequestBody SeguimientoEntity solicitud) {
        SeguimientoEntity nuevaSolicitud = seguimientoService.nuevoSeguimiento(solicitud);
        return ResponseEntity.ok(nuevaSolicitud);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SeguimientoEntity> cambioEstado(@PathVariable Long id,  @RequestBody Estado estado) {
        SeguimientoEntity seguimientoActualizado = seguimientoService.cambioEstado(id, estado);
        Evaluacion evaluacion = seguimientoService.actualizaEvaluacion(seguimientoActualizado);
        return ResponseEntity.ok(seguimientoActualizado);
    }

    @GetMapping("/cliente/{rut}")
    public ResponseEntity<List<SeguimientoEntity>> listaCreditosCliente(@PathVariable String rut) {
        List<SeguimientoEntity> creditos = seguimientoService.getCreditosCliente(rut);
        if (creditos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(creditos);
    }

    @GetMapping("/idSolicitud/{idSolicitud}")
    public ResponseEntity<SeguimientoEntity> getCreditoIdSolicitud(@PathVariable Long idSolicitud) {
        SeguimientoEntity credito = seguimientoService.getCreditoSolicitud(idSolicitud);
        return ResponseEntity.ok(credito);
    }

}
