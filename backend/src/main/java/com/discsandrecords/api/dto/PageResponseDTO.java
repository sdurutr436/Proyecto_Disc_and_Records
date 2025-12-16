package com.discsandrecords.api.dto;

import java.util.List;

/**
 * DTO genérico para respuestas paginadas.
 * @param <T> Tipo de elementos en la página
 */
public record PageResponseDTO<T>(
    List<T> content,
    int page,
    int size,
    long totalElements,
    int totalPages,
    boolean first,
    boolean last
) {
    
    /**
     * Crea un PageResponseDTO a partir de una Page de Spring Data
     */
    public static <T> PageResponseDTO<T> from(org.springframework.data.domain.Page<T> page) {
        return new PageResponseDTO<>(
            page.getContent(),
            page.getNumber(),
            page.getSize(),
            page.getTotalElements(),
            page.getTotalPages(),
            page.isFirst(),
            page.isLast()
        );
    }
}
