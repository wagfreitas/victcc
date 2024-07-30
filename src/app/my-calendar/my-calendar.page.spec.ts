import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyCalendarPage } from './my-calendar.page';

describe('MyCalendarPage', () => {
  let component: MyCalendarPage;
  let fixture: ComponentFixture<MyCalendarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCalendarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
