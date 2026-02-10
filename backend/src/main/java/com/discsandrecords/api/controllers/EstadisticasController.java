package com.discsandrecords.api.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.discsandrecords.api.dto.EstadisticasPlataformaDTO;
import com.discsandrecords.api.services.EstadisticasService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/estadisticas")
@Tag(name = "Estadísticas", description = "API para estadísticas generales de la plataforma")
public class EstadisticasController {

    private final EstadisticasService estadisticasService;

    public EstadisticasController(EstadisticasService estadisticasService) {
        this.estadisticasService = estadisticasService;
    }

    @GetMapping
    @Operation(summary = "Obtener estadísticas generales de la plataforma")
    @ApiResponse(responseCode = "200", description = "Estadísticas obtenidas correctamente")
    public ResponseEntity<EstadisticasPlataformaDTO> obtenerEstadisticas() {
        return ResponseEntity.ok(estadisticasService.obtenerEstadisticas());
    }
}
