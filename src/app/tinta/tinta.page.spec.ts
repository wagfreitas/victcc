import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TintaPage } from './tinta.page';

describe('TintaPage', () => {
  let component: TintaPage;
  let fixture: ComponentFixture<TintaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TintaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
