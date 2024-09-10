import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Projeto } from '../_interfaces/projeto';
import { UtilService } from '../_services/util.service';
import { ProjetoService } from '../_services/projeto.service';

@Component({
  selector: 'app-modal-projeto',
  templateUrl: './modal-projeto.component.html',
  styleUrls: ['./modal-projeto.component.scss'],
})
export class ModalProjetoComponent {
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
  nomeCliente: string = '';
  userId: string = '';

  constructor(
    private utilService: UtilService,
    private modalController: ModalController,
    private router: Router,
    private projetoService: ProjetoService

  ) {
    this.projetoService.getUserLogged().then((res) => {
      if (res) {
        this.userId = res.uid;
      }
    });

  }

  async onSave() {
    const dataIniConv = this.utilService.convertData(this.dataInicio);
    const dataFimConv = this.utilService.convertData(this.dataFim);

    const agenda: Projeto = {
      logradouro: this.logradouro,
      nomeProjeto: this.nomeProjeto,
      numero: this.numero,
      cep: this.cep,
      complemento: this.complemento,
      nomeCliente: this.cliente,
      dataFim: dataFimConv,
      dataInicio: dataIniConv,
      status: this.status,
      userId: this.userId,
      tipoServico: this.tipoServico,
    };

    await this.modalController.dismiss(agenda);


  }


  onCancel() {
    this.modalController.dismiss();
    this.router.navigate(['inicial']);
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
