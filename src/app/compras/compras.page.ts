import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
})
export class ComprasPage {

  constructor(private router: Router) { }

  testar() {
    console.log("Cliquei no botão");
  }

  voltar() {
    this.router.navigate(["projetos"]);
  }

}
