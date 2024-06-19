import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projetos-1',
  templateUrl: './projetos-1.page.html',
  styleUrls: ['./projetos-1.page.scss'],
})
export class Projetos1Page {

  abaselecionada = 'home';
  constructor(private router: Router) { }

  testar() {
    console.log("Cliquei no botão");
  }

  voltar() {
    this.router.navigate(["projetos"]);
  }

  menu(event: any) {
    this.abaselecionada = event.detail.value
  }
}
