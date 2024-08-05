import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.page.html',
  styleUrls: ['./inicial.page.scss'],
})
export class InicialPage {

  constructor(private router: Router) { }

  testar() {
    console.log("Cliquei no botão");
  }

  novoprojeto() {
    this.router.navigate(["/novo-projeto"]);
  }

  projetos() {
    this.router.navigate(["/projetos"]);
  }

  comunidade() {
    this.router.navigate(["/comunidade"]);
  }

  calculadora() {
    this.router.navigate(["/calculadora"]);
  }
}
