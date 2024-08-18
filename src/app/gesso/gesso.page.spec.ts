import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GessoPage } from './gesso.page';

describe('GessoPage', () => {
  let component: GessoPage;
  let fixture: ComponentFixture<GessoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GessoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
