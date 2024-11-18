package com.example.usuario_service.entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "clientes")
@Data //genera automaticamente los getters y setters
@NoArgsConstructor //genera un constructor sin argumentos para la clase
@AllArgsConstructor //constructor con todos los argumentos de la clase, por si se los pasas
public class UsuarioEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
    private String rut;
    private String nombre;
    private String apellidos;
    private int edad;
    private Double ingresos;
    private Boolean esMoroso; // se obtiene a traves del historial crediticio
    private Boolean esIndependiente;
    private Boolean esEstable;
    private Integer antiguedadLaboral;
    private Double deudaTotal;
    private String capacidadAhorro; //la establece el sistema
    private Double saldo; //Saldo en la cuenta de ahorros
    private Double mayorRetiro12; //mayor retiro en los ultimos 12 meses
    private Boolean saldoPositivo; //saldo positivo en los ultimos 12 meses
    private Integer tiempoCuentaAhorros;
    private Double mayorRetiro6;// mayor retiro del cliente en los ultimos 6 meses
    private Boolean depositoRegular; // si ingresa cada mes o cada trimestre, en los ultimos 12 meses
    private Double totalDepositos; //suma total de los depositos en los últimos 12 meses
}