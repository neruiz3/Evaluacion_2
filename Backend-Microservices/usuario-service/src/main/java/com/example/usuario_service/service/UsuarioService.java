package com.example.usuario_service.service;

import com.example.usuario_service.entity.UsuarioEntity;
import com.example.usuario_service.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

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

    public UsuarioEntity getClienteByRut(String rut){
        return usuarioRepository.findByRut(rut);
    }

    public UsuarioEntity getClienteById(Long id){
        return usuarioRepository.findById(id).get();
    }

    public ArrayList<UsuarioEntity> getClientes(){
        return (ArrayList<UsuarioEntity>) usuarioRepository.findAll();
    }

    public Boolean compruebaCampos(String rut){
        UsuarioEntity cliente = getClienteByRut(rut);
        Boolean camposCompletos = false;

        camposCompletos =  cliente.getIngresos() != null &&
                cliente.getEsMoroso() != null &&
                cliente.getEsIndependiente() != null &&
                cliente.getDeudaTotal() != null &&
                cliente.getSaldo() != null &&
                cliente.getMayorRetiro12() != null &&
                cliente.getSaldoPositivo() != null &&
                cliente.getTiempoCuentaAhorros() != null &&
                cliente.getMayorRetiro6() != null &&
                cliente.getDepositoRegular() != null;

        if(cliente.getEsIndependiente()!=null){
            if (cliente.getEsIndependiente() && cliente.getEsEstable() == null) {
                return false;
            }
            if((!cliente.getEsIndependiente()) && cliente.getAntiguedadLaboral()==null){
                return false;
            }
        }
        if(cliente.getSaldoPositivo()!=null){
            if(cliente.getSaldoPositivo() && cliente.getTotalDepositos()==null){
                return false;
            }
        }
        return camposCompletos;
    }
}
