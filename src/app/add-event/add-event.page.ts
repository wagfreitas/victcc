import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AgendaService } from '../_services/agenda.service';
import { UtilService } from '../_services/util.service';
import { Agenda } from '../shared/model/agenda';
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage  {

  cep: string = '';
  logradouro: string = '';
  bairro: string = '';
  complemento: string = '';
  numero: string = '';
  dataInicio: string = '';
  dataFim: string = '';
  cliente: string = '';
  tipoServico: string = '';
  categoria: string = '';

  constructor(
    private router: Router,
    private agendaService: AgendaService,
    private utilService: UtilService
  ) { }

  onBack() {
    this.router.navigate(['tabnav/tab3']);
  }

  onSave() {
    const dataIniConv = this.utilService.convertData(this.dataInicio);
    const dataFimConv = this.utilService.convertData(this.dataFim);


    const agenda: Agenda = {
      address: this.logradouro,
      numero: this.numero,
      complemento: this.complemento,
      categoria: this.categoria,
      cliente: this.cliente,
      dateFim: dataFimConv,
      dateInicio: dataIniConv,
      name: this.cliente,
      status: '',
      startTime: new Date(),
      endTime: new Date()
    };

    this.agendaService.createAgenda(agenda).then((res) => {
      console.log(res.id);
      if (res.id) {

       this.router.navigate(['tabnav']);
      } else {
       this.utilService.showErrorAlert('Houve algum erro ')
       this.router.navigate(['tabnav']);
      }
    });
  }

  getCep() {
    const url = `http://viacep.com.br/ws/${this.cep}/json`;
    fetch(url)
      .then((response) => response.json())
      .then((dados) => {
        this.logradouro = dados.logradouro;
        this.complemento = dados.complemento;
        this.bairro = dados.bairro;
      });
  }




}
