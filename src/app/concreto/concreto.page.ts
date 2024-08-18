import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-concreto',
  templateUrl: './concreto.page.html',
  styleUrls: ['./concreto.page.scss'],
})
export class ConcretoPage {

  volume = 0;
  unidade = "m³";
  resistencia = "25 MPa"
  cimento = "Cimento:";
  areia = "Areia:";
  brita = "Brita:";
  agua = "Água:"

  Ca = 195;
  ac = 0;
  Cc = 0;
  Cb = 1072.5;
  Var = 0;
  Car = 0;

  constructor(private router: Router) { }

  testar() {
    console.log("Cliquei no botão");
  }

  voltar() {
    this.router.navigate(["calculadora"]);
    this.unidade = "m³";
    this.resistencia = "25 MPa"
    this.cimento = "Cimento";
    this.areia = "Areia";
    this.brita = "Brita";
    this.agua = "Água"
  }

  calcular() {
    console.log(this.volume, this.unidade, this.resistencia)
    if (this.unidade === "L"){this.volume = this.volume / 1000}
    if (this.resistencia === "42 MPa") {this.ac = 0.35}
    if (this.resistencia === "35 MPa") {this.ac = 0.45}
    if (this.resistencia === "30 MPa") {this.ac = 0.55}
    if (this.resistencia === "25 MPa") {this.ac = 0.6}
    if (this.resistencia === "23 MPa") {this.ac = 0.65}
    if (this.resistencia === "21 MPa") {this.ac = 0.65}
    if (this.resistencia === "20 MPa") {this.ac = 0.7}
    if (this.resistencia === "18 MPa") {this.ac = 0.7}
    if (this.resistencia === "15 MPa") {this.ac = 0.8}
    if (this.resistencia === "12 MPa") {this.ac = 0.8}
    if (this.resistencia === "10 MPa") {this.ac = 0.8}
    if (this.resistencia === "8 MPa") {this.ac = 0.8}

    this.Cc = this.Ca/this.ac
    this.Var = 1 - (this.Cc/3100 + this.Cb/2630 + this.Ca/1000)
    this.Car = this.Var * 2530

    this.cimento = "Cimento: " + String(Math.ceil(this.volume * this.Cc)) + " kg (" + String(Math.ceil(this.volume * this.Cc / 50)) + " sacos)";
    this.areia = "Areia: " + String(Math.ceil(this.volume * this.Car)) + " kg";
    this.brita = "Brita: " + String(Math.ceil(this.volume * this.Cb)) + " kg";
    this.agua = "Água: " + String(Math.ceil(this.volume * this.Ca)) + " L"

    }
}
