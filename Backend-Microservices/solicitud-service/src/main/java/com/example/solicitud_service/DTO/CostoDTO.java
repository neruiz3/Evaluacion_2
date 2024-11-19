package com.example.solicitud_service.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor //genera un constructor sin argumentos para la clase
@AllArgsConstructor //constructor con todos los argumentos de la clase, por si se los pasas
public class CostoDTO {
    private Double cuotaMensual;
    private Double comisionAdmin;
    private Double seguroDesgravamen;
    private Double seguroIncendio = 20000.00;
    private Double costoMensual;
    private Double costoTotal;
}