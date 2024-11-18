package com.example.usuario_service.controller;

import com.example.usuario_service.entity.UsuarioEntity;
import com.example.usuario_service.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cliente")
@CrossOrigin("*")
public class UsuarioController {
    @Autowired
    UsuarioService usuarioService;

    @PostMapping("/")
    public ResponseEntity<UsuarioEntity> nuevoCliente(@RequestBody UsuarioEntity cliente) {
        UsuarioEntity nuevoCliente = usuarioService.guardaCliente(cliente);
        return ResponseEntity.ok(nuevoCliente);
    }

    @PutMapping("/")
    public ResponseEntity<UsuarioEntity> actualizaCliente(@RequestBody UsuarioEntity cliente) {
        UsuarioEntity clienteActualizado = usuarioService.actualizaCliente(cliente);
        return ResponseEntity.ok(clienteActualizado);
    }

    @GetMapping("/")
    public ResponseEntity<List<UsuarioEntity>> listaClientes() {
        List<UsuarioEntity> clientes = usuarioService.getClientes();
        return ResponseEntity.ok(clientes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioEntity> getClienteById(@PathVariable Long id) {
        UsuarioEntity cliente = usuarioService.getClienteById(id);
        return ResponseEntity.ok(cliente);
    }

    @GetMapping("/rut/{rut}")
    public ResponseEntity<UsuarioEntity> getClienteByRut(@PathVariable String rut) {
        UsuarioEntity cliente = usuarioService.getClienteByRut(rut);
        return ResponseEntity.ok(cliente);
    }
}