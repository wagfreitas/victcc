import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlocosPage } from './blocos.page';

describe('BlocosPage', () => {
  let component: BlocosPage;
  let fixture: ComponentFixture<BlocosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
