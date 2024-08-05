import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Projeto } from '../_interfaces/projeto';
import { UtilService } from '../_services/util.service';
import { AgendaService } from '../_services/agenda.service';

@Component({
  selector: 'app-modal-projeto',
  templateUrl: './modal-projeto.component.html',
  styleUrls: ['./modal-projeto.component.scss'],
})
export class ModalProjetoComponent  {
  cep: string = '';
  logradouro: string = '';
  bairro: string = '';
  complemento: string = '';
  numero: string = '';
  dataInicio: string = '';
  dataFim: string = '';
  cliente: string = '';
  tipoServico: [] = [];
  categoria: string = '';
  status: string = '';
  nomeProjeto: string = '';

  constructor(
   private  utilService: UtilService,
   private agendaService: AgendaService,
   private modalController: ModalController
  ) { }



  async onSave() {
    const dataIniConv = this.utilService.convertData(this.dataInicio);
    const dataFimConv = this.utilService.convertData(this.dataFim);


    const agenda: Projeto = {
      logradouro: this.logradouro,
      nomeProjeto: this.nomeProjeto,
      numero: this.numero,
      cep: this.cep,
      complemento: this.complemento,
      cliente: this.cliente,
      dataFim: dataFimConv,
      dataInicio: dataIniConv,
      status: this.status,
      tipoServico: this.tipoServico,

    };

    await this.modalController.dismiss(agenda);


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
