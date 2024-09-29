import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from 'src/app/shared-elements/services/client.service';
import { ResponsiveTableComponent } from 'src/app/shared-elements/atoms/responsive-table/responsive-table.component';
import { Itask } from 'src/app/interfaces/Itask';
import { IResponsiveTableKeyLabel } from 'src/app/interfaces/responsive.table.interfaces';

@Component({
  selector: 'app-tasks-administrator',
  standalone: true,
  imports: [CommonModule, ResponsiveTableComponent],
  templateUrl: './tasks-administrator.component.html',
  styleUrls: ['./tasks-administrator.component.scss']
})
export class TasksAdministratorComponent implements OnInit {

  constructor(private clientService: ClientService) {  }

  tasksList: Itask[] = [];
  replaceLabels: IResponsiveTableKeyLabel[] = [
    { key:'userId', label: 'Usuario asignado', position: 4},
    { key:'id', label: 'Id', position: 2},
    { key:'title', label: 'Tarea', position: 3},
    { key:'completed', label: 'Estatus', position:1}
  ]

  ngOnInit(): void {
    this.getTasksList();
  }

  getTasksList() {
    this.clientService.getTasksList().subscribe(tasksList => {
      this.tasksList = tasksList;
    });
  }

}
