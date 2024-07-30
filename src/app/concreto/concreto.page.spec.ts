import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConcretoPage } from './concreto.page';

describe('ConcretoPage', () => {
  let component: ConcretoPage;
  let fixture: ComponentFixture<ConcretoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcretoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
