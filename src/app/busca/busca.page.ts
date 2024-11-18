import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.page.html',
  styleUrls: ['./busca.page.scss'],
})
export class BuscaPage {

  public results: string[] = [];

  public data = [
    'Eletricista',
    'Pedreiro',
    'Pintor',
    'Marceneiro',
    'Encanador',
    'Jardineiro',
    'Serralheiro',
    'Vidraceiro',
    'Gesseiro',
    'Telhadista',
    'Engenheiro'
  ]

  constructor(private router: Router) { }

  voltar() {
    this.router.navigate(["inicial"]);
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.data.filter((d) => d.toLowerCase().indexOf(query) > -1);
  }
}
