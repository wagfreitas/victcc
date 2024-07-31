import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AgendaService } from '../_services/agenda.service';
import { UtilService } from '../_services/util.service';
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

    const dadosAgenda = {
      address: this.logradouro,
      numero: this.numero,
      complemento: this.complemento,
      categoria: this.categoria,
      cliente: this.cliente,
      dateFim: dataFimConv,
      dateInicio: dataIniConv,
      name: this.cliente,
    };

    this.agendaService.createAgenda(dadosAgenda).subscribe((res) => {
      if (res.message === 'Agenda Criada com Sucesso') {
        this.agendaService.getAllAgenda();
       this.utilService.showToast('Agenda Criada com Sucesso', 'blue', 'center')

       this.router.navigate(['tabs/tab3']);
      } else {
       this.utilService.showErrorAlert('Houve algum erro ')
       this.router.navigate(['tabs/tab3']);
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
