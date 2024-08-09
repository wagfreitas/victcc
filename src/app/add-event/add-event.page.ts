import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgendaService } from '../_services/agenda.service';
import { ProjetoService } from '../_services/projeto.service';
import { UtilService } from '../_services/util.service';
import { Agenda } from '../_interfaces/agenda';
import { Projeto } from '../_interfaces/projeto';
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {
  tempAgenda: Projeto[] = [];
  cep: string = '';
  logradouro: string = '';
  nomeProfissional: string = '';
  bairro: string = '';
  complemento: string = '';
  numero: string = '';
  dataInicio: string = '';
  dataFim: string = '';
  cliente: string = '';
  tipoAgenda: string = '';
  categoria: string = '';
  id: string = '';
  observacao: string = '';

  constructor(
    private router: Router,
    private agendaService: AgendaService,
    private utilService: UtilService,
    private projService: ProjetoService
  ) { }

  onBack() {
    this.router.navigate(['tabnav/tab3']);
  }

  ngOnInit(): void {

    this.projService.getIdProject().subscribe((res: any) => {

      this.tempAgenda.push(res);

      console.log(this.tempAgenda)
     });


  }

  onSave() {
    const dataIniConv = this.utilService.convertData(this.dataInicio);
    const dataFimConv = this.utilService.convertData(this.dataFim);


    const agenda: Agenda = {
      idProjeto: this.tempAgenda[0].id,
      tipoAgenda: this.tipoAgenda,
      cep: this.tempAgenda[0].cep,
      logradouro: this.tempAgenda[0].logradouro,
      numero: this.tempAgenda[0].numero,
      complemento: this.tempAgenda[0].complemento,
      nomeCliente: this.tempAgenda[0].nomeCliente ,
      dateFim: dataFimConv,
      dateInicio: dataIniConv,
      status: this.tempAgenda[0].status,
      startTime: new Date(dataIniConv),
      endTime: new Date(dataFimConv),
      nomeProfissional: this.nomeProfissional,
      observacao: this.observacao
    };


    console.log(agenda)

    this.agendaService.createAgenda(agenda).then((res) => {
      if (res.id) {

        this.utilService.success_msg('Agenda criada com sucesso');

       this.router.navigate(['tabs/calendar']);
      } else {
       this.utilService.showErrorAlert('Houve algum erro ')
       this.router.navigate(['tabs/calendar']);
      }
    });
  }


  onCancel(){

    this.router.navigate(['tabs/calendar']);
  }

  getCep() {
    const url = `http://viacep.com.br/ws/${this.cep}/json`;
    fetch(url)
      .then((response) => response.json())
      .then((dados) => {
        console.log(dados);
        this.logradouro = dados.logradouro;
        this.complemento = dados.complemento;
        this.bairro = dados.bairro;
      });
  }




}
