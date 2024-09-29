import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexElementTableComponent } from './complex-element-table.component';

describe('ComplexElementTableComponent', () => {
  let component: ComplexElementTableComponent;
  let fixture: ComponentFixture<ComplexElementTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ComplexElementTableComponent]
    });
    fixture = TestBed.createComponent(ComplexElementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
