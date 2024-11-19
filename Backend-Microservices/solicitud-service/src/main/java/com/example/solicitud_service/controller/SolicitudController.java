package com.example.solicitud_service.controller;

import com.example.solicitud_service.DTO.CostoDTO;
import com.example.solicitud_service.DTO.TipoPrestamoDTO;
import com.example.solicitud_service.entity.SolicitudEntity;
import com.example.solicitud_service.service.SolicitudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/credito")
@CrossOrigin("*")
public class SolicitudController {

    @Autowired
    SolicitudService solicitudService;

    //funcion para solicitar el credito: primero hay que crear un expediente para cada credito
    @PostMapping("/")
    public ResponseEntity<SolicitudEntity> nuevaSolicitud(@RequestBody SolicitudEntity solicitud) {
        SolicitudEntity nuevaSolicitud = solicitudService.creaExpediente(solicitud);
        return ResponseEntity.ok(nuevaSolicitud);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> eliminaId(@PathVariable Long id) throws Exception {
        var isDeleted = solicitudService.eliminaCredito(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/")
    public ResponseEntity<List<SolicitudEntity>> listaCreditos() {
        List<SolicitudEntity> creditos = solicitudService.getCreditos();
        if (creditos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(creditos);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<SolicitudEntity> getCreditoId(@PathVariable Long id) {
        SolicitudEntity credito = solicitudService.getCredito(id);
        return ResponseEntity.ok(credito);
    }

    @GetMapping("/cliente/{rut}")
    public ResponseEntity<List<SolicitudEntity>> listaCreditosCliente(@PathVariable String rut) {
        List<SolicitudEntity> creditos = solicitudService.getCreditosCliente(rut);
        if (creditos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(creditos);
    }

    @GetMapping("/tipo-prestamo")
    public List<TipoPrestamoDTO> obtenerTiposPrestamo() {
        List<TipoPrestamoDTO> prestamos = solicitudService.obtenerTiposPrestamo();
        return prestamos;
    }

    @PostMapping ("/costoTotal")
    public CostoDTO costoTotal(@RequestBody SolicitudEntity credito) {
        CostoDTO costos = solicitudService.calculaCostoTotal(credito);
        return costos;
    }

}
