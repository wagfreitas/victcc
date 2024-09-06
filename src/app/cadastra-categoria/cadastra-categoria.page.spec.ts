import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastraCategoriaPage } from './cadastra-categoria.page';

describe('CadastraCategoriaPage', () => {
  let component: CadastraCategoriaPage;
  let fixture: ComponentFixture<CadastraCategoriaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastraCategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
