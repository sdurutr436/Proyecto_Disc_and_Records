package com.discsandrecords.api.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.discsandrecords.api.dto.EstadisticasPlataformaDTO;
import com.discsandrecords.api.repositories.EstadisticasRepository;

@Service
@Transactional(readOnly = true)
public class EstadisticasService {

    private final EstadisticasRepository estadisticasRepository;

    public EstadisticasService(EstadisticasRepository estadisticasRepository) {
        this.estadisticasRepository = estadisticasRepository;
    }

    public EstadisticasPlataformaDTO obtenerEstadisticas() {
        return estadisticasRepository.obtenerEstadisticas();
    }
}
