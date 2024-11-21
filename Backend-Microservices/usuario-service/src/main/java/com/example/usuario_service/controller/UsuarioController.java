package com.example.usuario_service.controller;

import com.example.usuario_service.DocumentacionDTO;
import com.example.usuario_service.entity.UsuarioEntity;
import com.example.usuario_service.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/cliente")
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
        Optional<UsuarioEntity> clienteExistente = Optional.ofNullable(usuarioService.getClienteById(cliente.getId()));
        UsuarioEntity nuevoCliente;

        if (clienteExistente.isPresent()) {
            // Si el cliente existe, actualizamos ciertos campos
            UsuarioEntity clienteActualizado = clienteExistente.get();
            clienteActualizado.setRut(cliente.getRut());
            clienteActualizado.setNombre(cliente.getNombre());
            clienteActualizado.setApellidos(cliente.getApellidos());
            clienteActualizado.setEdad(cliente.getEdad());
            clienteActualizado.setIngresos(cliente.getIngresos());
            clienteActualizado.setEsMoroso(cliente.getEsMoroso());
            clienteActualizado.setEsIndependiente(cliente.getEsIndependiente());
            clienteActualizado.setEsEstable(cliente.getEsEstable());
            clienteActualizado.setAntiguedadLaboral(cliente.getAntiguedadLaboral());
            clienteActualizado.setDeudaTotal(cliente.getDeudaTotal());
            clienteActualizado.setCapacidadAhorro(cliente.getCapacidadAhorro());
            clienteActualizado.setSaldo(cliente.getSaldo());
            clienteActualizado.setMayorRetiro12(cliente.getMayorRetiro12());
            clienteActualizado.setSaldoPositivo(cliente.getSaldoPositivo());
            clienteActualizado.setTiempoCuentaAhorros(cliente.getTiempoCuentaAhorros());
            clienteActualizado.setMayorRetiro6(cliente.getMayorRetiro6());
            clienteActualizado.setDepositoRegular(cliente.getDepositoRegular());
            clienteActualizado.setTotalDepositos(cliente.getTotalDepositos());
            // Aquí puedes agregar otros campos que desees actualizar
            nuevoCliente = usuarioService.guardaCliente(clienteActualizado);
        } else {
            // Si el cliente no existe, lo guardamos como nuevo
            nuevoCliente = usuarioService.guardaCliente(cliente);
        }
        return ResponseEntity.ok(nuevoCliente);
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
        UsuarioEntity cliente = usuarioService.getClienteByRut(rut).get();
        return ResponseEntity.ok(cliente);
    }

    @PostMapping("/nuevo-documento")
    public ResponseEntity<UsuarioEntity> nuevoDocumento(
            @RequestParam("rut") String rut,
            @RequestParam(value = "comprobanteIngresos", required = false) MultipartFile comprobanteIngresos,
            @RequestParam(value = "escrituraVivienda", required = false) MultipartFile escrituraVivienda,
            @RequestParam(value = "historialCrediticio", required = false) MultipartFile historialCrediticio,
            @RequestParam(value = "certificadoAvaluo", required = false) MultipartFile certificadoAvaluo,
            @RequestParam(value = "estadoNegocio", required = false) MultipartFile estadoNegocio,
            @RequestParam(value = "planNegocio", required = false) MultipartFile planNegocio,
            @RequestParam(value = "presupuestoRemodelacion", required = false) MultipartFile presupuestoRemodelacion,
            @RequestParam(value = "certificadoAntiguedadLaboral", required = false) MultipartFile certificadoAntiguedadLaboral,
            @RequestParam(value = "informeDeudas", required = false) MultipartFile informeDeudas,
            @RequestParam(value = "fotocopiaRut", required = false) MultipartFile fotocopiaRut,
            @RequestParam(value = "cuentaAhorros", required = false) MultipartFile cuentaAhorros
    ) throws IOException {
        UsuarioEntity cliente = usuarioService.getClienteByRut(rut).get();

        if (comprobanteIngresos != null) cliente.setComprobanteIngresos(comprobanteIngresos.getBytes());
        if (escrituraVivienda != null) cliente.setEscrituraVivienda(escrituraVivienda.getBytes());
        if (historialCrediticio != null) cliente.setHistorialCrediticio(historialCrediticio.getBytes());
        if (certificadoAvaluo != null) cliente.setCertificadoAvaluo(certificadoAvaluo.getBytes());
        if (estadoNegocio != null) cliente.setEstadoNegocio(estadoNegocio.getBytes());
        if (planNegocio != null) cliente.setPlanNegocio(planNegocio.getBytes());
        if (presupuestoRemodelacion != null) cliente.setPresupuestoRemodelacion(presupuestoRemodelacion.getBytes());
        if (certificadoAntiguedadLaboral != null) cliente.setCertificadoAntiguedadLaboral(certificadoAntiguedadLaboral.getBytes());
        if (informeDeudas != null) cliente.setInformeDeudas(informeDeudas.getBytes());
        if (fotocopiaRut != null) cliente.setFotocopiaRut(fotocopiaRut.getBytes());
        if (cuentaAhorros != null) cliente.setCuentaAhorros(cuentaAhorros.getBytes());

        UsuarioEntity clienteDocumentacion = usuarioService.guardaCliente(cliente);
        return ResponseEntity.ok(clienteDocumentacion);
    }

    @PostMapping("/actualiza-documento")
    public ResponseEntity<UsuarioEntity> actualizaDocumento(
            @RequestParam("id") Long id,
            @RequestParam("rut") String rut,
            @RequestParam(value = "comprobanteIngresos", required = false) MultipartFile comprobanteIngresos,
            @RequestParam(value = "escrituraVivienda", required = false) MultipartFile escrituraVivienda,
            @RequestParam(value = "historialCrediticio", required = false) MultipartFile historialCrediticio,
            @RequestParam(value = "certificadoAvaluo", required = false) MultipartFile certificadoAvaluo,
            @RequestParam(value = "estadoNegocio", required = false) MultipartFile estadoNegocio,
            @RequestParam(value = "planNegocio", required = false) MultipartFile planNegocio,
            @RequestParam(value = "presupuestoRemodelacion", required = false) MultipartFile presupuestoRemodelacion,
            @RequestParam(value = "certificadoAntiguedadLaboral", required = false) MultipartFile certificadoAntiguedadLaboral,
            @RequestParam(value = "informeDeudas", required = false) MultipartFile informeDeudas,
            @RequestParam(value = "fotocopiaRut", required = false) MultipartFile fotocopiaRut,
            @RequestParam(value = "cuentaAhorros", required = false) MultipartFile cuentaAhorros
    ) throws IOException {
        UsuarioEntity cliente = usuarioService.getClienteById(id);

        if (comprobanteIngresos != null) cliente.setComprobanteIngresos(comprobanteIngresos.getBytes());
        if (escrituraVivienda != null) cliente.setEscrituraVivienda(escrituraVivienda.getBytes());
        if (historialCrediticio != null) cliente.setHistorialCrediticio(historialCrediticio.getBytes());
        if (certificadoAvaluo != null) cliente.setCertificadoAvaluo(certificadoAvaluo.getBytes());
        if (estadoNegocio != null) cliente.setEstadoNegocio(estadoNegocio.getBytes());
        if (planNegocio != null) cliente.setPlanNegocio(planNegocio.getBytes());
        if (presupuestoRemodelacion != null) cliente.setPresupuestoRemodelacion(presupuestoRemodelacion.getBytes());
        if (certificadoAntiguedadLaboral != null) cliente.setCertificadoAntiguedadLaboral(certificadoAntiguedadLaboral.getBytes());
        if (informeDeudas != null) cliente.setInformeDeudas(informeDeudas.getBytes());
        if (fotocopiaRut != null) cliente.setFotocopiaRut(fotocopiaRut.getBytes());
        if (cuentaAhorros != null) cliente.setCuentaAhorros(cuentaAhorros.getBytes());

        UsuarioEntity clienteDocumentacion = usuarioService.actualizaCliente(cliente);
        return ResponseEntity.ok(clienteDocumentacion);
    }


    @GetMapping("/documentacion/{rut}")
    public ResponseEntity<DocumentacionDTO> obtenerDocumentacionPorRut(@PathVariable String rut) {
        UsuarioEntity documentosCliente = usuarioService.getClienteByRut(rut).get();
        DocumentacionDTO dto = new DocumentacionDTO();
        dto.setId(documentosCliente.getId());
        dto.setRut(documentosCliente.getRut());
        dto.setComprobanteIngresos(documentosCliente.getComprobanteIngresos() != null ? Base64.getEncoder().encodeToString(documentosCliente.getComprobanteIngresos()) : null);
        dto.setEscrituraVivienda(documentosCliente.getEscrituraVivienda() != null ? Base64.getEncoder().encodeToString(documentosCliente.getEscrituraVivienda()) : null);
        dto.setHistorialCrediticio(documentosCliente.getHistorialCrediticio() != null ? Base64.getEncoder().encodeToString(documentosCliente.getHistorialCrediticio()) : null);
        dto.setCertificadoAvaluo(documentosCliente.getCertificadoAvaluo() != null ? Base64.getEncoder().encodeToString(documentosCliente.getCertificadoAvaluo()) : null);
        dto.setEstadoNegocio(documentosCliente.getEstadoNegocio() != null ? Base64.getEncoder().encodeToString(documentosCliente.getEstadoNegocio()) : null);
        dto.setPlanNegocio(documentosCliente.getPlanNegocio() != null ? Base64.getEncoder().encodeToString(documentosCliente.getPlanNegocio()) : null);
        dto.setPresupuestoRemodelacion(documentosCliente.getPresupuestoRemodelacion() != null ? Base64.getEncoder().encodeToString(documentosCliente.getPresupuestoRemodelacion()) : null);
        dto.setCertificadoAntiguedadLaboral(documentosCliente.getCertificadoAntiguedadLaboral() != null ? Base64.getEncoder().encodeToString(documentosCliente.getCertificadoAntiguedadLaboral()) : null);
        dto.setInformeDeudas(documentosCliente.getInformeDeudas() != null ? Base64.getEncoder().encodeToString(documentosCliente.getInformeDeudas()) : null);
        dto.setFotocopiaRut(documentosCliente.getFotocopiaRut() != null ? Base64.getEncoder().encodeToString(documentosCliente.getFotocopiaRut()) : null);
        dto.setCuentaAhorros(documentosCliente.getCuentaAhorros() != null ? Base64.getEncoder().encodeToString(documentosCliente.getCuentaAhorros()) : null);
        return ResponseEntity.ok(dto);
    }
}