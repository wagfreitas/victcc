import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarMode } from 'ionic2-calendar';
import { CalendarComponent } from 'ionic2-calendar';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import * as moment from 'moment';

import { AgendaService } from './../_services/agenda.service';
import { Agenda } from '../shared/model/agenda';

registerLocaleData(localePt);

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage {

  eventSource: any[] = [];
  viewTitle: string =''
  numEvent: number = 0;

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
    private agendaService: AgendaService) {
      this.agendaService.getAgenda().subscribe((ret) => {
        console.log(ret)
    this.createEvents(ret)
      })
     }

  next() {
    this.myCal.slideNext();
  }

  back() {
    this.myCal.slidePrev();
  }

  createEvents(agendaList: Agenda[]) {


    var events: any[] = [];

    agendaList.map(res => {

      var date = new Date();
      var eventType = res.status;
      var startDay = new Date(res.dateInicio);
      var endDay = new Date(res.dateFim);
      var categoria = res.categoria;


        events.push({
          projeto: res.name,
          startTime: startDay,
          endTime: endDay,
          categoria: categoria,
          allDay: true,
          cliente: res.cliente,
          endereco: res.address,
          complemento: res.complemento,

        })
    })

      this.eventSource = events;
    }

    onDateSelected(event: any) {

      const events = this.eventSource.filter(x => moment(x.startTime).format('DD-MM-YYYY') >=
       moment(event).format('DD-MM-YYYY') && moment(event).format('DD-MM-YYYY') <= moment(x.endTime).format('DD-MM-YYYY'));
       console.log('aqui'), events
      this.bookings = events;
    }

  onCurrentDateChanged(event: Date) {

    const events = this.eventSource.filter(x =>moment(event).format('DD-MM-YYYY') >= moment(x.startTime).format('DD-MM-YYYY')
     && moment(event).format('DD-MM-YYYY') <= moment(x.endTime).format('DD-MM-YYYY'));
 this.numEvent = events.length;
   this.bookings = events;
  }

  async onEventSelected(event: any) {
    const events = this.eventSource.filter(x => moment(event).format('DD-MM-YYYY') >= moment(x.startTime).format('DD-MM-YYYY') );
    this.bookings = events;
  }

  onViewTitleChanged(title: string) {
    this.viewTitle = title.charAt(0).toUpperCase() + title.slice(1);;
  }

  reloadSource(ev: {startTime: Date, endTime: Date}) {
    console.log(ev);
  }

  onTimeSelected(ev: {selectedTime: Date, events: any[]}) {
    console.log(ev.selectedTime, ev.events);
  }

  goToAddEvent(){
    this.router.navigate(['./tabs/newEvent'])
  }



}
