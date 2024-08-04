import { Component, OnInit } from '@angular/core';
import { CalendarMode } from 'ionic2-calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage {

  eventSource: any[] = [];

  calendar = {
    mode: 'week' as CalendarMode,
    currentDate: new Date(),
    step: 30,
    startTime: '00:00',
    endTime: '23:59',
  };

  constructor() { }

  onCurrentDateChanged(event: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);

    if (this.calendar.mode === 'month') {
      if (event.getFullYear() < today.getFullYear() || (event.getFullYear() === today.getFullYear() && event.getMonth() <= today.getMonth())) {

      } else {

      }
    }
  }

  async onEventSelected(event: any) {
    console.log(event);
  }

  onViewTitleChanged(title: any) {
    console.log(title);
  }

  reloadSource(ev: {startTime: Date, endTime: Date}) {
    console.log(ev);
  }

  onTimeSelected(ev: {selectedTime: Date, events: any[]}) {
    console.log(ev);
  }



}
