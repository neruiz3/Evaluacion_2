package com.example.solicitud_service.model;

import com.example.solicitud_service.Estado;
import com.example.solicitud_service.TipoPrestamo;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor //genera un constructor sin argumentos para la clase
@AllArgsConstructor //constructor con todos los argumentos de la clase, por si se los pasas
public class Seguimiento {
    private long idSolicitud;
    private String rut; //para saber el cliente que ha solicitado ese credito, no se si hace fala realmente
    @Enumerated(EnumType.STRING)
    private TipoPrestamo tipoPrestamo;
    @Enumerated(EnumType.STRING)
    private Estado estado = Estado.EN_REVISION_INICIAL; //por defecto se inicializa este valor
}