import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-prestador',
  templateUrl: './prestador.page.html',
  styleUrls: ['./prestador.page.scss'],
})
export class PrestadorPage {

  constructor(private router: Router) { }

  voltar() {
    this.router.navigate(["inicial"]);
  }
}
