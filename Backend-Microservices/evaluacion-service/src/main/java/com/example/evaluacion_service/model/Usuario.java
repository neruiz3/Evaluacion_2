package com.example.evaluacion_service.model;

import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

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
    @Lob
    private byte[] comprobanteIngresos;
    //escritura primera vivienda
    @Lob
    private byte[] escrituraVivienda;
    //Historial crediticio
    @Lob
    private byte[] historialCrediticio;
    //Certificado avaluo
    @Lob
    private byte[] certificadoAvaluo;
    //estado financiero del negocio
    @Lob
    private byte[] estadoNegocio;
    //plan de negocios
    @Lob
    private byte[] planNegocio;
    //presupuesto de la remodelacion
    @Lob
    private byte[] presupuestoRemodelacion;
    @Lob
    private byte[] certificadoAntiguedadLaboral;
    @Lob
    private byte[] informeDeudas;
    @Lob
    private byte[] fotocopiaRut;
    @Lob
    private byte[] cuentaAhorros;
}
