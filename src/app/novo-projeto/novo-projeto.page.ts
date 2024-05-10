import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-novo-projeto',
  templateUrl: './novo-projeto.page.html',
  styleUrls: ['./novo-projeto.page.scss'],
})
export class NovoProjetoPage {

  constructor(private router: Router) { }

  testar() {
    console.log("Cliquei no botão");
  }

  voltar() {
    this.router.navigate(["inicial"]);
  }

}
