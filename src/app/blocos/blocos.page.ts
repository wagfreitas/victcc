import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-blocos',
  templateUrl: './blocos.page.html',
  styleUrls: ['./blocos.page.scss'],
})
export class BlocosPage {

  resultado = "Quantidade:";
  quantidade!: 0;
  altbloco!: 0;
  unialtbloco = "cm";
  largbloco!: 0;
  unilargbloco = "cm";
  altparede!: 0;
  unialtparede = "m";
  largparede!: 0;
  unilargparede = "m";

  constructor(private router: Router) { }

  testar() {
    console.log("Cliquei no botão");
  }

  voltar() {
    this.router.navigate(["calculadora"]);

  }

  calcular() {
    console.log(this.quantidade)
    this.resultado = "Quantidade: " + String(Math.ceil((this.largparede*100/this.largbloco)*(this.altparede*100/this.altbloco))) + " blocos"

  }

}
