import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.page.html',
  styleUrls: ['./calculadora.page.scss'],
})
export class CalculadoraPage {

  material = "";
  unidade = "";
  quantidade!: 0;
  resultado = "Resultado";

  constructor(private router: Router) { }

  testar() {
    console.log("Cliquei no botão");
  }

  voltar() {
    this.router.navigate(["inicial"]);
    this.material = "";
    this.unidade = "";
    this.resultado = "Quantidade necessária";
  }

  concreto() {
    this.router.navigate(["concreto"]);
  }

  blocos() {
    this.router.navigate(["blocos"]);
  }

  tinta() {
    this.router.navigate(["tinta"]);
  }

  telha() {
    this.router.navigate(["telha"]);
  }

  chapisco() {
    this.router.navigate(["chapisco"]);
  }

  gesso() {
    this.router.navigate(["gesso"]);
  }

  revestimento() {
    this.router.navigate(["revestimento"]);
  }

}
