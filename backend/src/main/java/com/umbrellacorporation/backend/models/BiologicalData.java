package com.umbrellacorporation.backend.models;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;

@Entity
@Table(name = "biological_data")
public class BiologicalData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter @Getter
    @Column(name = "genero_especie", nullable = false)
    private String generoEspecie;

    @Setter @Getter
    @Column(name = "periodo_tiempo", nullable = false)
    private String periodoTiempo;

    @Setter @Getter
    @Column(name = "ubicacion", nullable = false)
    private String ubicacion;

    @Setter @Getter
    @Column(name = "zona", nullable = false)
    private String zona;

    @Setter @Getter
    @Column(name = "pais_actual", nullable = false)
    private String paisActual;

    @Setter @Getter
    @Column(name = "habitat")
    private String habitat;

    @Setter @Getter
    @Column(name = "capacidad_craneal", nullable = false)
    private Double capacidadCraneal;

    @Setter @Getter
    @Column(name = "altura", nullable = false)
    private Double altura;

    @Setter @Getter
    @Column(name = "tipo_dieta")
    private String tipoDieta;

    @Setter @Getter
    @Column(name = "dimorfismo_sexual")
    private String dimorfismoSexual;

    @Setter @Getter
    @Column(name = "estructura_cadera")
    private String estructuraCadera;

    @Setter @Getter
    @Column(name = "estructura_frontal_vertical")
    private String estructuraFrontalVertical;

    @Setter @Getter
    @Column(name = "caracteristicas_anatomicas")
    private String caracteristicasAnatomicas;

    @Setter @Getter
    @Column(name = "migrado")
    private Boolean migrado;

    @Setter @Getter
    @Column(name = "caracteristicas_esqueleto")
    private String caracteristicasEsqueleto;


    public BiologicalData() {
    }

    public BiologicalData(String generoEspecie, String periodoTiempo, String ubicacion, String zona, String paisActual, String habitat, Double capacidadCraneal, Double altura, String tipoDieta, String dimorfismoSexual, String estructuraCadera, String estructuraFrontalVertical, String caracteristicasAnatomicas, Boolean migrado, String caracteristicasEsqueleto) {
        this.generoEspecie = generoEspecie;
        this.periodoTiempo = periodoTiempo;
        this.ubicacion = ubicacion;
        this.zona = zona;
        this.paisActual = paisActual;
        this.habitat = habitat;
        this.capacidadCraneal = capacidadCraneal;
        this.altura = altura;
        this.tipoDieta = tipoDieta;
        this.dimorfismoSexual = dimorfismoSexual;
        this.estructuraCadera = estructuraCadera;
        this.estructuraFrontalVertical = estructuraFrontalVertical;
        this.caracteristicasAnatomicas = caracteristicasAnatomicas;
        this.migrado = migrado;
        this.caracteristicasEsqueleto = caracteristicasEsqueleto;
    }

    public BiologicalData(Long id, String generoEspecie, String periodoTiempo, String ubicacion, String zona, String paisActual, String habitat, Double capacidadCraneal, Double altura, String tipoDieta, String dimorfismoSexual, String estructuraCadera, String estructuraFrontalVertical, String caracteristicasAnatomicas, Boolean migrado, String caracteristicasEsqueleto) {
        this.id = id;
        this.generoEspecie = generoEspecie;
        this.periodoTiempo = periodoTiempo;
        this.ubicacion = ubicacion;
        this.zona = zona;
        this.paisActual = paisActual;
        this.habitat = habitat;
        this.capacidadCraneal = capacidadCraneal;
        this.altura = altura;
        this.tipoDieta = tipoDieta;
        this.dimorfismoSexual = dimorfismoSexual;
        this.estructuraCadera = estructuraCadera;
        this.estructuraFrontalVertical = estructuraFrontalVertical;
        this.caracteristicasAnatomicas = caracteristicasAnatomicas;
        this.migrado = migrado;
        this.caracteristicasEsqueleto = caracteristicasEsqueleto;
    }

    @Override
    public String toString() {
        return "BiologicalData{" +
                "id=" + id +
                ", generoEspecie='" + generoEspecie + '\'' +
                ", periodoTiempo='" + periodoTiempo + '\'' +
                ", ubicacion='" + ubicacion + '\'' +
                ", zona='" + zona + '\'' +
                ", paisActual='" + paisActual + '\'' +
                ", habitat='" + habitat + '\'' +
                ", capacidadCraneal=" + capacidadCraneal +
                ", altura=" + altura +
                ", tipoDieta='" + tipoDieta + '\'' +
                ", dimorfismoSexual='" + dimorfismoSexual + '\'' +
                ", estructuraCadera='" + estructuraCadera + '\'' +
                ", estructuraFrontalVertical='" + estructuraFrontalVertical + '\'' +
                ", caracteristicasAnatomicas='" + caracteristicasAnatomicas + '\'' +
                ", migrado=" + migrado +
                ", caracteristicasEsqueleto='" + caracteristicasEsqueleto + '\'' +
                '}';
    }
}