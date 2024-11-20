package com.example.evaluacion_service.repository;

import com.example.evaluacion_service.entity.EvaluacionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface EvaluacionRepository extends JpaRepository<EvaluacionEntity, Long> {
    public ArrayList<EvaluacionEntity> findByRut(String rut);
    public EvaluacionEntity findByIdSolicitud(Long idSolicitud);
}
