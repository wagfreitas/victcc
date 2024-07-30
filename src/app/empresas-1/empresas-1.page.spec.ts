import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Empresas1Page } from './empresas-1.page';

describe('Empresas1Page', () => {
  let component: Empresas1Page;
  let fixture: ComponentFixture<Empresas1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Empresas1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
