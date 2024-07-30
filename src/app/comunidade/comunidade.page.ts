import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comunidade',
  templateUrl: './comunidade.page.html',
  styleUrls: ['./comunidade.page.scss'],
})
export class ComunidadePage {

  constructor(private router: Router) { }

  testar() {
    console.log("Cliquei no botão");
  }

  voltar() {
    this.router.navigate(["inicial"]);
  }

  buscar() {
    this.router.navigate(["busca-profissionais"]);
  }

  proximo() {
    this.router.navigate(["empresas-1"]);
  }


}
