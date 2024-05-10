import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-busca-profissionais',
  templateUrl: './busca-profissionais.page.html',
  styleUrls: ['./busca-profissionais.page.scss'],
})
export class BuscaProfissionaisPage {
  profissional = "";
  profissionais =
    ['Eletricista',
    'Encanador',
    'Pintor',
    "Engenheiro"];
  items = [
    { title: 'Item 1', description: 'Descrição do Item 1' },
    { title: 'Item 2', description: 'Descrição do Item 2' },
    { title: 'Item 3', description: 'Descrição do Item 3' }
  ];

  constructor(private router: Router) { }

  testar() {
    console.log("Cliquei no botão");
  }

  voltar() {
    this.router.navigate(["inicial"]);
  }

}
