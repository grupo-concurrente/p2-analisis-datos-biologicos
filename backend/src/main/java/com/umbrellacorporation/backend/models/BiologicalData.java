package com.umbrellacorporation.backend.models;

import lombok.*;

import jakarta.persistence.*;

@Table(name = "biological_data")
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class BiologicalData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Getter
    @Column(name = "genus_species", nullable = false)
    private int genusSpecies;

    @Setter
    @Getter
    @Column(name = "time_period", nullable = false)
    private double timePeriod;

    @Setter
    @Getter
    @Column(name = "location", nullable = false)
    private int location;

    @Setter
    @Getter
    @Column(name = "zone", nullable = false)
    private int zone;

    @Setter
    @Getter
    @Column(name = "current_country", nullable = false)
    private int currentCountry;

    @Setter
    @Getter
    @Column(name = "habitat", nullable = false)
    private int habitat;

    @Setter
    @Getter
    @Column(name = "cranial_capacity", nullable = false)
    private double cranialCapacity;

    @Setter
    @Getter
    @Column(name = "height", nullable = false)
    private double height;

    @Setter
    @Getter
    @Column(name = "incisor_size", nullable = false)
    private int incisorSize;

    @Setter
    @Getter
    @Column(name = "jaw_shape", nullable = false)
    private int jawShape;

    @Setter
    @Getter
    @Column(name = "torus_supraorbital", nullable = false)
    private int torusSupraorbital;

    @Setter
    @Getter
    @Column(name = "prognathism", nullable = false)
    private int prognathism;

    @Setter
    @Getter
    @Column(name = "foramen_magnum_position", nullable = false)
    private int foramenMagnumPosition;

    @Setter
    @Getter
    @Column(name = "canine_size", nullable = false)
    private int canineSize;

    @Setter
    @Getter
    @Column(name = "canines_shape", nullable = false)
    private int caninesShape;

    @Setter
    @Getter
    @Column(name = "tooth_enamel", nullable = false)
    private int toothEnamel;

    @Setter
    @Getter
    @Column(name = "tecno_culture", nullable = false)
    private int tecnoCulture;

    @Setter
    @Getter
    @Column(name = "tecno_type", nullable = false)
    private int tecnoType;

    @Setter
    @Getter
    @Column(name = "bipedalism", nullable = false)
    private int bipedalism;

    @Setter
    @Getter
    @Column(name = "arms_length", nullable = false)
    private int armsLength;

    @Setter
    @Getter
    @Column(name = "feet_structure", nullable = false)
    private int feetStructure;

    @Setter
    @Getter
    @Column(name = "diet_type", nullable = false)
    private int dietType;

    @Setter
    @Getter
    @Column(name = "sexual_dimorphism", nullable = false)
    private int sexualDimorphism;

    @Setter
    @Getter
    @Column(name = "hip_structure", nullable = false)
    private int hipStructure;

    @Setter
    @Getter
    @Column(name = "vertical_front_structure", nullable = false)
    private int verticalFrontStructure;

    @Setter
    @Getter
    @Column(name = "anatomy_features", nullable = false)
    private int anatomyFeatures;

    @Setter
    @Getter
    @Column(name = "migrated", nullable = false)
    private int migrated;

    @Setter
    @Getter
    @Column(name = "skeleton_features", nullable = false)
    private int skeletonFeatures;

    public BiologicalData(int genusSpecies, int timePeriod, int location, int zone, int currentCountry, int habitat, double cranialCapacity, double height, int incisorSize, int jawShape, int torusSupraorbital, int prognathism, int foramenMagnumPosition, int canineSize, int caninesShape, int toothEnamel, int tecnoCulture, int tecnoType, int bipedalism, int armsLength, int feetStructure, int dietType, int sexualDimorphism, int hipStructure, int verticalFrontStructure, int anatomyFeatures, int migrated, int skeletonFeatures) {
        this.genusSpecies = genusSpecies;
        this.timePeriod = timePeriod;
        this.location = location;
        this.zone = zone;
        this.currentCountry = currentCountry;
        this.habitat = habitat;
        this.cranialCapacity = cranialCapacity;
        this.height = height;
        this.incisorSize = incisorSize;
        this.jawShape = jawShape;
        this.torusSupraorbital = torusSupraorbital;
        this.prognathism = prognathism;
        this.foramenMagnumPosition = foramenMagnumPosition;
        this.canineSize = canineSize;
        this.caninesShape = caninesShape;
        this.toothEnamel = toothEnamel;
        this.tecnoCulture = tecnoCulture;
        this.tecnoType = tecnoType;
        this.bipedalism = bipedalism;
        this.armsLength = armsLength;
        this.feetStructure = feetStructure;
        this.dietType = dietType;
        this.sexualDimorphism = sexualDimorphism;
        this.hipStructure = hipStructure;
        this.verticalFrontStructure = verticalFrontStructure;
        this.anatomyFeatures = anatomyFeatures;
        this.migrated = migrated;
        this.skeletonFeatures = skeletonFeatures;
    }
}