package com.example.evaluacion_service.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor //genera un constructor sin argumentos para la clase
@AllArgsConstructor
public class TipoPrestamoDTO {
    private String nombre;
    private int plazoMaximo;
    private int montoMaximo;
    private double tasaInteresMinima;
    private double tasaInteresMaxima;
    private boolean comprobanteIngreso;
    private boolean certificadoAvaluo;
    private boolean historialCrediticio;
    private boolean escrituraVivienda;
    private boolean estadoFinanciero;
    private boolean planNegocios;
    private boolean presupuestoRemodelacion;

}