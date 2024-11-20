package com.example.seguimiento_service.entity;



import com.example.seguimiento_service.Estado;
import com.example.seguimiento_service.TipoPrestamo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "seguimiento-creditos")
@Data //genera automaticamente los getters y setters
@NoArgsConstructor //genera un constructor sin argumentos para la clase
@AllArgsConstructor //constructor con todos los argumentos de la clase, por si se los pasas
public class SeguimientoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    private Long idSolicitud;
    private String rut; //para saber el cliente que ha solicitado ese credito, no se si hace fala realmente

    @Enumerated(EnumType.STRING)
    @Column(name = "tipoPrestamo", nullable = false)
    private TipoPrestamo tipoPrestamo;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false)
    private Estado estado;
}
