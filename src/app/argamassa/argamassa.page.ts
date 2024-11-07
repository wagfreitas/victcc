import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-argamassa',
  templateUrl: './argamassa.page.html',
  styleUrls: ['./argamassa.page.scss'],
})
export class ArgamassaPage {

  alt = 0;
  larg = 0;
  unialt = "m";
  unilarg = "m";
  area = 0;
  tipo = " ";
  coefarg = 0;
  coefrej = 0;
  argamassa = 0;
  rejunte = 0;
  quantiarg = "Argamassa:";
  quantirej = "Rejunte:";

  constructor(private router: Router) { }

  testar() {
    console.log("Cliquei no botão");
  }

  voltar() {
    this.router.navigate(["calculadora"]);
    this.alt = 0;
    this.larg = 0;
    this.unialt = "m";
    this.unilarg = "m";
    this.area = 0;
    this.tipo = " ";
    this.coefarg = 0;
    this.coefrej = 0;
    this.argamassa = 0;
    this.rejunte = 0;
    this.quantiarg = "Quantidade de argamassa:";
    this.quantirej = "Quantidade de rejunte:";

  }

  calcular() {

    if (this.unialt === "cm"){this.alt = this.alt / 100}
    if (this.unilarg === "cm"){this.larg = this.larg / 100}

    this.area = this.alt * this.larg;

    if (this.tipo === "Placa cerâmica (Junta de 3 a 5 mm)") {this.coefarg = 4.4} {this.coefrej = 0.4}
    if (this.tipo === "Placa cerâmica (Junta de 5 a 10 mm)") {this.coefarg = 4.4} {this.coefrej = 1}
    if (this.tipo === "Porcelanato") {this.coefarg = 5} {this.coefrej = 0.21}
    if (this.tipo === "Ladrilho hidráulico (Espessura de 2.5 cm)") {this.coefarg = 4.8} {this.coefrej = 0.875}
    if (this.tipo === "Ladrilho hidráulico (Espessura de 1.8 cm)") {this.coefarg = 4.8} {this.coefrej = 0.7}

    this.argamassa = this.area * this.coefarg;
    this.rejunte = this.area * this.coefrej;

    this.quantiarg = "Argamassa: " + String(this.argamassa) + "kg";
    this.quantirej = "Rejunte: " + String(this.rejunte) + "kg";

    }
}
