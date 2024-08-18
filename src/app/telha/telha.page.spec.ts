import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TelhaPage } from './telha.page';

describe('TelhaPage', () => {
  let component: TelhaPage;
  let fixture: ComponentFixture<TelhaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TelhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
