package com.example.usuario_service;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor //genera un constructor sin argumentos para la clase
@AllArgsConstructor //constructor con todos los argumentos de la clase, por si se los pasas
public class DocumentacionDTO {
    private Long id;
    private String rut;
    private String comprobanteIngresos;
    private String escrituraVivienda;
    private String historialCrediticio;
    private String certificadoAvaluo;
    private String estadoNegocio;
    private String planNegocio;
    private String presupuestoRemodelacion;
    private String certificadoAntiguedadLaboral;
    private String informeDeudas;
    private String fotocopiaRut;
    private String cuentaAhorros;
}