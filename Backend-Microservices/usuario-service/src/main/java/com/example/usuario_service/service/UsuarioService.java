package com.example.usuario_service.service;

import com.example.usuario_service.entity.UsuarioEntity;
import com.example.usuario_service.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    UsuarioRepository usuarioRepository;

    public UsuarioEntity guardaCliente(UsuarioEntity cliente){
        return usuarioRepository.save(cliente);
    }

    public UsuarioEntity actualizaCliente(UsuarioEntity cliente){
        return usuarioRepository.save(cliente);
    }

    public Optional<UsuarioEntity> getClienteByRut(String rut){
        return usuarioRepository.findByRut(rut);
    }

    public UsuarioEntity getClienteById(Long id){
        return usuarioRepository.findById(id).get();
    }

    public ArrayList<UsuarioEntity> getClientes(){
        return (ArrayList<UsuarioEntity>) usuarioRepository.findAll();
    }
}
