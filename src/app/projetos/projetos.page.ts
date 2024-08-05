import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjetoService } from '../_services/projeto.service';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.page.html',
  styleUrls: ['./projetos.page.scss'],
})
export class ProjetosPage {
public projetos: {nomeProjeto: string, id:string}[] = [];
  constructor(
    private router: Router,
    private projetoService: ProjetoService
  ) {
this.projetoService.getProjetos().subscribe((res: any[]) => {

  res.forEach(element => {
    let resul = { nomeProjeto: element.nomeProjeto, id: element.id}
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

  abrir(id:string) {
    this.router.navigate(["tabs/projExec", id]);
  }


}
