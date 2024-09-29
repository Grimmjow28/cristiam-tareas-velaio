import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSelectComponent } from './main-select.component';

describe('MainSelectComponent', () => {
  let component: MainSelectComponent;
  let fixture: ComponentFixture<MainSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MainSelectComponent]
    });
    fixture = TestBed.createComponent(MainSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
