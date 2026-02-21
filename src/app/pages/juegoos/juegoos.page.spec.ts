import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JuegoosPage } from './juegoos.page';

describe('JuegoosPage', () => {
  let component: JuegoosPage;
  let fixture: ComponentFixture<JuegoosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JuegoosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
