package com.discsandrecords.api.repositories;

import com.discsandrecords.api.entities.Genero;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GeneroRepository extends JpaRepository<Genero, Long> {
    Optional<Genero> findByNombreGenero(String nombreGenero);
    Optional<Genero> findByNombreGeneroIgnoreCase(String nombreGenero);
    List<Genero> findByNombreGeneroContainingIgnoreCase(String nombre);
    boolean existsByNombreGeneroIgnoreCase(String nombreGenero);
}
