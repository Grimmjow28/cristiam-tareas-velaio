import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksAdministratorComponent } from './tasks-administrator.component';

describe('TasksAdministratorComponent', () => {
  let component: TasksAdministratorComponent;
  let fixture: ComponentFixture<TasksAdministratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TasksAdministratorComponent]
    });
    fixture = TestBed.createComponent(TasksAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
