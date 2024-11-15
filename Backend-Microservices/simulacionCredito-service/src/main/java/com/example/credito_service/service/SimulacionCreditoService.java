package com.example.credito_service.service;


import com.example.credito_service.entity.SimulacionCreditoEntity;
import com.example.credito_service.repository.SimulacionCreditoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SimulacionCreditoService {
    @Autowired
    SimulacionCreditoRepository simulacionCreditoRepository;

    //Hay que poner condiciones en cuanto al monto y el resto de parametros? o es se pone en otro lado??
    public SimulacionCreditoEntity calculaSimulacion (SimulacionCreditoEntity simulacion){
        simulacion.setCuotaMensual(calcularCuotaMensual(simulacion.getPlazo(), simulacion.getTasaInteres(), simulacion.getMonto()));
        return simulacion; //ya se han establecido los valores de la simulacion
    }

    private double calcularCuotaMensual(int plazo, double tasaInteres, double monto) {
        int n = plazo * 12; // numero total de pagos
        double r = tasaInteres / 12.0 / 100.0; //tasa de interes mensual
        double p = monto;
        // M = P[r(1+r)^n]/[(1+r)^n-1]
        return ((p*r*Math.pow((1+r),n))/(Math.pow((1+r),n)-1));
    }
}
