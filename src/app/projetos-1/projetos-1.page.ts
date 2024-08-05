
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjetoService } from '../_services/projeto.service';

@Component({
  selector: 'app-projetos-1',
  templateUrl: './projetos-1.page.html',
  styleUrls: ['./projetos-1.page.scss'],
})
export class Projetos1Page implements OnInit {
  titulo: string = ''
  id: string = ''
  status : number=0;
  abaselecionada = 'home';
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private projService: ProjetoService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {

      this.id = params['id']
    })
    this.projService.getProjetoById(this.id).subscribe((res: any) => {
      this.titulo = res.nomeProjeto
      this.status = res.status
    })

  }

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
