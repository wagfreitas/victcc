import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-comunidade',
  templateUrl: './comunidade.page.html',
  styleUrls: ['./comunidade.page.scss'],
})
export class ComunidadePage {

  constructor(private router: Router) { }

  voltar() {
    this.router.navigate(["inicial"]);
  }

  prestadores() {
    this.router.navigate(["prestador"]);
  }

  buscar() {
    this.router.navigate(["busca"]);
  }

}
