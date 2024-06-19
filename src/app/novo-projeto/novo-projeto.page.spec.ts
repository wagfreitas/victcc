import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NovoProjetoPage } from './novo-projeto.page';

describe('NovoProjetoPage', () => {
  let component: NovoProjetoPage;
  let fixture: ComponentFixture<NovoProjetoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoProjetoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
