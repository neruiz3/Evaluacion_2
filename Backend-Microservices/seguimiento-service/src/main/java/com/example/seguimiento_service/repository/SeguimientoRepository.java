package com.example.seguimiento_service.repository;

import com.example.seguimiento_service.entity.SeguimientoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface SeguimientoRepository extends JpaRepository<SeguimientoEntity, Long> {
    public SeguimientoEntity findByIdSolicitud(Long SolicitudId);
    public ArrayList<SeguimientoEntity> findByRut(String rut);
}