package com.example.credito_service.repository;

import com.example.credito_service.entity.SimulacionCreditoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface SimulacionCreditoRepository extends JpaRepository<SimulacionCreditoEntity, Long> {
}
