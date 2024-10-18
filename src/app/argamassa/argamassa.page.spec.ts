import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArgamassaPage } from './argamassa.page';

describe('ArgamassaPage', () => {
  let component: ArgamassaPage;
  let fixture: ComponentFixture<ArgamassaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ArgamassaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
