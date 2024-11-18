package com.example.usuario_service.repository;

import com.example.usuario_service.entity.UsuarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Long> {
    public UsuarioEntity findByRut(String rut);
}
