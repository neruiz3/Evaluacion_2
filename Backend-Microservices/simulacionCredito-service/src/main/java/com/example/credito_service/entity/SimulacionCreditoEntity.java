package com.example.credito_service.entity;

import com.example.credito_service.Estado;
import com.example.credito_service.TipoPrestamo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "simulaciones")
@Data //genera automaticamente los getters y setters
@NoArgsConstructor //genera un constructor sin argumentos para la clase
@AllArgsConstructor //constructor con todos los argumentos de la clase, por si se los pasas
public class SimulacionCreditoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    private String rut; //para saber el cliente que ha solicitado ese credito, no se si hace fala realmente

    @Column(name = "plazo", nullable = false)
    private int plazo;

    @Column(name = "tasaInteres", nullable = false)
    private double tasaInteres;

    @Column(name = "monto", nullable = false)
    private double monto;

    private double cuotaMensual;

}
