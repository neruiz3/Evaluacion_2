package com.example.seguimiento_service.model;

import com.example.seguimiento_service.Estado;
import com.example.seguimiento_service.TipoPrestamo;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor //genera un constructor sin argumentos para la clase
@AllArgsConstructor //constructor con todos los argumentos de la clase, por si se los pasas
public class Evaluacion {
    private long id;
    private long idSolicitud;
    private String rut; //para saber el cliente que ha solicitado ese credito, no se si hace fala realmente
    private int plazo;
    private double tasaInteres;
    private double monto;
    @Enumerated(EnumType.STRING)
    private TipoPrestamo tipoPrestamo;
    private double valorPropiedad;
    private double cuotaMensual; // no estoy segura de que haya que incluir aqui la cuota mensual
    @Enumerated(EnumType.STRING)
    private Estado estado;
}
