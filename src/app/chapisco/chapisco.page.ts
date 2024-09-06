import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-chapisco',
  templateUrl: './chapisco.page.html',
  styleUrls: ['./chapisco.page.scss'],
})
export class ChapiscoPage {

  area = 0;
  espessura = 0;
  volume = 0;
  uniarea = "m²";
  uniesp = "cm";
  traco = "Chapisco"
  cimento = "Cimento:";
  areia = "Areia:";
  agua = "Água:"

  C = 0;
  Ar = 0;
  Ag = 0;
  total = 0;

  constructor(private router: Router) { }

  testar() {
    console.log("Cliquei no botão");
  }

  voltar() {
    this.router.navigate(["calculadora"]);
  }

  calcular() {

    let aream = this.convertToM2(this.area, this.uniarea);
    let espessuram = this.convertToM(this.espessura, this.uniesp);

    this.volume = aream * espessuram;

    if (this.traco === "Chapisco") {this.C = 1, this.Ar = 3, this.Ag = 1}
    if (this.traco === "Reboco") {this.C = 1, this.Ar = 6, this.Ag = 1}

    this.total = this.C + this.Ar + this.Ag

    this.C = this.C / this.total;
    this.Ar = this.Ar / this.total;
    this.Ag = this.Ag / this.total;

    this.cimento = "Cimento: " + String((this.volume * this.C)) + " kg (" + String(Math.ceil(this.volume * this.C / 50)) + " sacos)";
    this.areia = "Areia: " + String((this.volume * this.Ar)) + " kg";
    this.agua = "Água: " + String((this.volume * this.Ag)) + " L"

    }

    convertToM(value: number, unit: string): number {
      switch (unit) {
        case 'cm':
          return value / 100;
        case 'm':
          return value;
        default:
          return value;
      }
    }

    convertToM2(value: number, unit: string): number {
      switch (unit) {
        case 'cm2':
          return value / 10000;
        case 'm2':
          return value;
        default:
          return value;
      }
    }
}
