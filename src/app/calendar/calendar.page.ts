
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarMode } from 'ionic2-calendar';
import { CalendarComponent } from 'ionic2-calendar';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import * as moment from 'moment';
import { UtilService } from './../_services/util.service';

import { AgendaService } from './../_services/agenda.service';
import { Agenda } from '../_interfaces/agenda';
import { ProjetoService } from '../_services/projeto.service';
import { Projeto } from '../_interfaces/projeto';

registerLocaleData(localePt);

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage {
  projectName: string = '';
  projectId: string = '';
  projeto: Projeto = {  }
  eventSource: any[] = [];
  viewTitle: string = ''
  numEvent: number = 0;
  dtInicio : string= '';
  dtFim: string= '';

  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
    step: 30,
    startTime: '00:00',
    endTime: '23:59',
  };




  bookings: any[] = [];

  @ViewChild(CalendarComponent) myCal!: CalendarComponent;

  constructor(
    private router: Router,
    private agendaService: AgendaService,
    private projService: ProjetoService,
    private utilService: UtilService
  ) {

    this.projService.getIdProject().subscribe((res: any) => {
      this.projeto = res;
      })


      if (this.projeto.id) {
        console.log('numero do projeto', this.projeto.id)
        this.agendaService.getAgendaById(this.projeto.id).subscribe((ret) => {
          if (ret) {
            this.createEvents(ret)

          }

      })
      }

  }

  next() {
    this.myCal.slideNext();
  }

  back() {
    this.myCal.slidePrev();
  }

  createEvents(agendaList: Agenda[]) {

    this.dtInicio= this.utilService.convertData2(agendaList[0].dateInicio || '');
    this.dtFim = this.utilService.convertData2(agendaList[0].dateFim || '');
    console.log(this.dtFim, this.dtInicio)
    var events: Agenda[] = [];

    agendaList.map(res => {
      var startDay = new Date(res.dateInicio || '');
      var endDay = new Date(res.dateFim || '');

      // Itera sobre cada dia do evento
      for (let d = startDay; d <= endDay; d.setDate(d.getDate() + 1)) {
        let currentDay = new Date(d); // Cria uma nova instância para evitar mutações inesperadas
        let currentDayOfWeek = currentDay.getDay();

        // Verifica se o dia atual é um dia útil (não é sábado ou domingo)
        if (currentDayOfWeek !== 0 && currentDayOfWeek !== 6) {
          // Se for o último dia do evento, verifique se ele é um dia útil
          let isLastDay = currentDay.getTime() === endDay.getTime();
          let eventEndTime = currentDay;

          if (isLastDay) {
            // Se o último dia do evento não for fim de semana, use o dateFim como endTime
            eventEndTime = endDay;
          }

          events.push({
            nomeProjeto: res.nomeProjeto,
            startTime: new Date(currentDay), // Define o início como o dia atual
            endTime: new Date(eventEndTime), // Define o final baseado na lógica acima
            nomeCliente: res.nomeCliente,
            logradouro: res.logradouro,
            complemento: res.complemento,
            numero: res.numero,
            cep: res.cep,
            status: res.status,
            title: res.title,
            idProjeto: res.idProjeto,
            dateInicio: res.dateInicio,
            dateFim: res.dateFim,
          });
        }
      }
    });

    this.eventSource = events;
    console.log(this.eventSource);
  }

  onDateSelected(event: any) {

    const events = this.eventSource.filter(x => moment(x.startTime).format('DD-MM-YYYY') >=
      moment(event).format('DD-MM-YYYY') && moment(event).format('DD-MM-YYYY') <= moment(x.endTime).format('DD-MM-YYYY'));
    console.log('aqui'), events
    this.bookings = events;
  }

  onCurrentDateChanged(event: Date) {

    const events = this.eventSource.filter(x => moment(event).format('DD-MM-YYYY') >= moment(x.startTime).format('DD-MM-YYYY')
      && moment(event).format('DD-MM-YYYY') <= moment(x.endTime).format('DD-MM-YYYY'));
    this.numEvent = events.length;
    this.bookings = events;
  }

  async onEventSelected(event: any) {
    const events = this.eventSource.filter(x => moment(event).format('DD-MM-YYYY') >= moment(x.startTime).format('DD-MM-YYYY'));
    this.bookings = events;
  }

  onViewTitleChanged(title: string) {
    this.viewTitle = title.charAt(0).toUpperCase() + title.slice(1);;
  }

  reloadSource(ev: { startTime: Date, endTime: Date }) {
    console.log(ev);
  }

  onTimeSelected(ev: { selectedTime: Date, events: any[] }) {
    console.log(ev.selectedTime, ev.events);
  }

  goToAddEvent() {
    this.router.navigate(['./tabs/newEvent'])
  }

  testar() {
    console.log("Cliquei no botão");
  }

  voltar() {
    this.router.navigate(["projetos"]);

}

}
