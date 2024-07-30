import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresas-1',
  templateUrl: './empresas-1.page.html',
  styleUrls: ['./empresas-1.page.scss'],
})
export class Empresas1Page {

  constructor(private router: Router) { }

  testar() {
    console.log("Cliquei no botão");
  }

  voltar() {
    this.router.navigate(["comunidade"]);
  }

}
