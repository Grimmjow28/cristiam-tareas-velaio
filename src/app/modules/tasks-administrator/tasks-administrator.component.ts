import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from 'src/app/shared-elements/services/client.service';
import { ResponsiveTableComponent } from 'src/app/shared-elements/atoms/responsive-table/responsive-table.component';
import { Itask } from 'src/app/interfaces/Itask';
import { IResponsiveTableKeyLabel } from 'src/app/interfaces/responsive.table.interfaces';
import { Subject, takeUntil } from 'rxjs';
import { StoreService } from 'src/app/shared-elements/services/store.service';

@Component({
  selector: 'app-tasks-administrator',
  standalone: true,
  imports: [CommonModule, ResponsiveTableComponent],
  templateUrl: './tasks-administrator.component.html',
  styleUrls: ['./tasks-administrator.component.scss']
})
export class TasksAdministratorComponent implements OnInit, OnDestroy {

  constructor(private clientService: ClientService, private storeService: StoreService) {  }


  tasksList: Itask[] = [];
  replaceLabels: IResponsiveTableKeyLabel[] = [
    { key:'userName', label: 'Usuario asignado', position: 4},
    { key:'id', label: 'Id', position: 2},
    { key:'title', label: 'Tarea', position: 3},
    { key:'completed', label: 'Estatus', position:1}
  ]

  private readonly unsubscribe$: Subject<void> = new Subject();

  ngOnInit(): void {
    this.storeService.gettaskList().pipe(takeUntil(this.unsubscribe$)).subscribe(tasksList => {
      this.tasksList = tasksList;
    })
    this.getTasksList();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getTasksList() {
    this.clientService.getTasksList();
  }

}
