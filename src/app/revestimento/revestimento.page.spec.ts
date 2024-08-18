import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RevestimentoPage } from './revestimento.page';

describe('RevestimentoPage', () => {
  let component: RevestimentoPage;
  let fixture: ComponentFixture<RevestimentoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RevestimentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
