import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-chapisco',
  templateUrl: './chapisco.page.html',
  styleUrls: ['./chapisco.page.scss'],
})
export class ChapiscoPage {

  alt = 0;
  larg = 0;
  unialt = "m";
  unilarg = "m";
  area = 0;
  tipo = " ";
  Careia = 0;
  Ccimento = 0;
  Ccal = 0;
  areia = 0;
  cimento = 0;
  cal = 0;
  Qareia = "Areia:";
  Qcimento = "Cimento:";
  Qcal = "Cal:";

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
    this.Careia = 0;
    this.Ccimento = 0;
    this.Ccal = 0;
    this.areia = 0;
    this.cimento = 0;
    this.cal = 0;
    this.Qareia = "Areia:";
    this.Qcimento = "Cimento:";
    this.Qcal = "Cal:";
  }

  calcular() {

    if (this.unialt === "cm"){this.alt = this.alt / 100}
    if (this.unilarg === "cm"){this.larg = this.larg / 100}

    this.area = this.alt * this.larg;

    if (this.tipo === "Chapisco") {this.Careia = 13.156}
    if (this.tipo === "Chapisco") {this.Ccimento = 2.265}
    if (this.tipo === "Chapisco") {this.Ccal = 0}
    if (this.tipo === "Emboço") {this.Careia = 64.515}
    if (this.tipo === "Emboço") {this.Ccimento = 2.28}
    if (this.tipo === "Emboço") {this.Ccal = 4.54}
    if (this.tipo === "Reboco") {this.Careia = 10.879}
    if (this.tipo === "Reboco") {this.Ccimento = 0}
    if (this.tipo === "Reboco") {this.Ccal = 1.5116}

    this.areia = Math.ceil(this.area * this.Careia);
    this.cimento = Math.ceil(this.area * this.Ccimento);
    this.cal = Math.ceil(this.area * this.Ccal);

    this.Qareia = "Areia: " + String(this.areia) + "kg";
    this.Qcimento = "Cimento: " + String(this.cimento) + "kg";
    this.Qcal = "Cal: " + String(this.cal) + "kg";

    console.log(this.Careia, this.Ccimento, this.Ccal);

    }
}
