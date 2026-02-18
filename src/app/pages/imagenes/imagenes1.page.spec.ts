import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImagenesPage } from './imagenes1.page';

describe('ImagenesPage', () => {
  let component: ImagenesPage;
  let fixture: ComponentFixture<ImagenesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
//