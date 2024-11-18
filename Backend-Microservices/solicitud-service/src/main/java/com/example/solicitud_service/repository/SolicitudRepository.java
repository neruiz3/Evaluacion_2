package com.example.solicitud_service.repository;

import com.example.solicitud_service.entity.SolicitudEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface SolicitudRepository extends JpaRepository<SolicitudEntity, Long> {
    public ArrayList<SolicitudEntity> findByRut(String rut);
}