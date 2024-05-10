import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscaProfissionaisPage } from './busca-profissionais.page';

describe('BuscaProfissionaisPage', () => {
  let component: BuscaProfissionaisPage;
  let fixture: ComponentFixture<BuscaProfissionaisPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscaProfissionaisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
