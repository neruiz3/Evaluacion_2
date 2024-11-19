package com.example.evaluacion_service;

public enum TipoPrestamo {
    // no se como meter lo de los documentos
    PRIMERAVIVIENDA(30, 80, 3.5, 5.0, true, true, true, false, false, false, false),
    SEGUNDAVIVIENDA(20, 70, 4.0, 6.0, true, true, true, true, false, false, false),
    COMERCIAL(25, 60, 5.0, 7.0, true, true, false, false, true, true, false),
    REMODELACION(15, 50, 4.5, 6.0, true, true, false, false, false, false, true);

    private final int plazoMaximo;
    private final int montoMaximo;
    private final double tasaInteresMinima;
    private final double tasaInteresMaxima;
    private final boolean comprobanteIngreso;
    private final boolean certificadoAvaluo;
    private final boolean historialCrediticio;
    private final boolean escrituraVivienda;
    private final boolean estadoFinanciero;
    private final boolean planNegocios;
    private final boolean presupuestoRemodelacion;


    TipoPrestamo(int plazoMaximo, int montoMaximo, double tasaInteresMinima, double tasaInteresMaxima, boolean comprobanteIngreso,
                 boolean certificadoAvaluo, boolean historialCrediticio, boolean escrituraVivienda, boolean estadoFinanciero, boolean planNegocios, boolean presupuestoRemodelacion) {
        this.plazoMaximo = plazoMaximo;
        this.montoMaximo = montoMaximo;
        this.tasaInteresMinima = tasaInteresMinima;
        this.tasaInteresMaxima = tasaInteresMaxima;
        this.comprobanteIngreso = comprobanteIngreso;
        this.certificadoAvaluo = certificadoAvaluo;
        this.historialCrediticio = historialCrediticio;
        this.escrituraVivienda = escrituraVivienda;
        this.estadoFinanciero = estadoFinanciero;
        this.planNegocios = planNegocios;
        this.presupuestoRemodelacion = presupuestoRemodelacion;
    }

    public int getPlazoMaximo() {
        return plazoMaximo;
    }

    public int getMontoMaximo() {
        return montoMaximo;
    }

    public double getTasaInteresMaxima() {
        return tasaInteresMaxima;
    }

    public double getTasaInteresMinima() {
        return tasaInteresMinima;
    }

    public boolean isCertificadoAvaluo() {
        return certificadoAvaluo;
    }

    public boolean isComprobanteIngreso() {
        return comprobanteIngreso;
    }

    public boolean isEscrituraVivienda() {
        return escrituraVivienda;
    }

    public boolean isEstadoFinanciero() {
        return estadoFinanciero;
    }

    public boolean isHistorialCrediticio() {
        return historialCrediticio;
    }

    public boolean isPlanNegocios() {
        return planNegocios;
    }

    public boolean isPresupuestoRemodelacion() {
        return presupuestoRemodelacion;
    }
}