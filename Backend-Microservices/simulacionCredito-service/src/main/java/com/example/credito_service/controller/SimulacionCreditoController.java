package com.example.credito_service.controller;

import com.example.credito_service.entity.SimulacionCreditoEntity;
import com.example.credito_service.service.SimulacionCreditoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/simulacion-credito")
public class SimulacionCreditoController {

    @Autowired
    SimulacionCreditoService simulacionCreditoService;

    @PostMapping("/calculaSimulacion")
    public ResponseEntity<SimulacionCreditoEntity> calculaSimulacion(@RequestBody SimulacionCreditoEntity simulacion) {
        SimulacionCreditoEntity credito = simulacionCreditoService.calculaSimulacion(simulacion);
        return ResponseEntity.ok(credito);
    }
}