import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChapiscoPage } from './chapisco.page';

describe('ChapiscoPage', () => {
  let component: ChapiscoPage;
  let fixture: ComponentFixture<ChapiscoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapiscoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
