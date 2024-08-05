import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjetoService } from '../_services/projeto.service';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.page.html',
  styleUrls: ['./projetos.page.scss'],
})
export class ProjetosPage {
public projetos: {nomeProjeto: string}[] = [];
  constructor(
    private router: Router,
    private projetoService: ProjetoService
  ) {
this.projetoService.getProjetos().subscribe((res: any[]) => {
  res.forEach(element => {
    let resul = { nomeProjeto: element.nomeProjeto }
    console.log(res)
     this.projetos.push(resul)

  });
  console.log(this.projetos)
})
}

  testar() {
    console.log("Cliquei no botão");
  }

  voltar() {
    this.router.navigate(["inicial"]);
  }

  abrir() {
    this.router.navigate(["tabnav"]);
  }


}
