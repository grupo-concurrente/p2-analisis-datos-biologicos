package com.umbrellacorporation.backend.repositories;

import com.umbrellacorporation.backend.models.BiologicalData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BiologicalDataRepository extends JpaRepository<BiologicalData, Long> {
}
