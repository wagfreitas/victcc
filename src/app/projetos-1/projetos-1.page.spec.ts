import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Projetos1Page } from './projetos-1.page';

describe('Projetos1Page', () => {
  let component: Projetos1Page;
  let fixture: ComponentFixture<Projetos1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Projetos1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
