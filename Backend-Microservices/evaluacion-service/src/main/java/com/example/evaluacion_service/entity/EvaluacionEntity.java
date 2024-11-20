package com.example.evaluacion_service.entity;

import com.example.evaluacion_service.Estado;
import com.example.evaluacion_service.TipoPrestamo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "creditos-evaluados")
@Data //genera automaticamente los getters y setters
@NoArgsConstructor //genera un constructor sin argumentos para la clase
@AllArgsConstructor //constructor con todos los argumentos de la clase, por si se los pasas
public class EvaluacionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    private Long idSolicitud;

    private String rut; //para saber el cliente que ha solicitado ese credito, no se si hace fala realmente

    @Column(name = "plazo", nullable = false)
    private int plazo;

    @Column(name = "tasaInteres", nullable = false)
    private double tasaInteres;

    @Column(name = "monto", nullable = false)
    private double monto;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipoPrestamo", nullable = false)
    private TipoPrestamo tipoPrestamo;

    private double valorPropiedad;

    private double cuotaMensual; // no estoy segura de que haya que incluir aqui la cuota mensual

    @Enumerated(EnumType.STRING)
    private Estado estado = Estado.EN_REVISION_INICIAL; //por defecto se inicializa este valor
}
