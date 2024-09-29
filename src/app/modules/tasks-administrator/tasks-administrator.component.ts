import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from 'src/app/shared-elements/services/client.service';
import { ResponsiveTableComponent } from 'src/app/shared-elements/atoms/responsive-table/responsive-table.component';
import { Itask } from 'src/app/interfaces/Itask';
import { IResponsiveTableKeyLabel } from 'src/app/interfaces/responsive.table.interfaces';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { StoreService } from 'src/app/shared-elements/services/store.service';
import { MainButtonComponent } from 'src/app/shared-elements/atoms/main-button/main-button.component';
import { MainModalComponent } from 'src/app/shared-elements/atoms/main-modal/main-modal.component';
import { ModalService } from 'src/app/shared-elements/services/modal.service';
import { IFilters } from 'src/app/interfaces/IFilters';
import { MainSelectComponent } from 'src/app/shared-elements/atoms/main-select/main-select.component';

@Component({
  selector: 'app-tasks-administrator',
  standalone: true,
  imports: [CommonModule, ResponsiveTableComponent, MainButtonComponent, MainModalComponent, MainSelectComponent],
  templateUrl: './tasks-administrator.component.html',
  styleUrls: ['./tasks-administrator.component.scss']
})
export class TasksAdministratorComponent implements OnInit, OnDestroy {

  constructor(private clientService: ClientService, private storeService: StoreService, private modalService: ModalService) {  }


  tasksList: Itask[] = [];
  filteredTasksList: Itask[] = [];
  replaceLabels: IResponsiveTableKeyLabel[] = [
    { key:'user', label: 'Personas asociadas', position: 5, isComplex: true},
    { key:'id', label: 'Id', position: 1},
    { key:'title', label: 'Tarea', position: 3},
    { key:'completed', label: 'Estatus', position:2},
    { key:'date', label: 'Fecha', position: 4}
  ];
  useButtonsOnTheFields = ['completed'];
  slectedFilter: number = 0;
  filters: IFilters[] =  [
    {
      label: 'Todas',
      activateColor: 'darkgrey',
      value: 0,
    },
    {
      label: 'Completadas',
      activateColor: 'darkgrey',
      value: 1,
    },
    {
      label: 'Pendientes',
      activateColor: 'darkgrey',
      value: 2,
    }
  ];

  listaElementos: string[] = ['Cartas', 'Tabla'];
  showModal: Observable< boolean> = of(false);
  showContentAsCard: boolean = true;

  private readonly unsubscribe$: Subject<void> = new Subject();

  ngOnInit(): void {
    this.storeService.gettaskList().pipe(takeUntil(this.unsubscribe$)).subscribe(tasksList => {
      this.tasksList = tasksList;
      this.generateFilteredList();
    });
    this.showModal = this.modalService.getShowModal();
    this.getTasksList();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getTasksList() {
    this.clientService.getTasksList();
  }

  agregateElement() {
    this.modalService.setShowModal(true);
  }

  ApplyFilter($event: string) {
    for(let filter of this.filters) {
      if(filter.label.includes($event) ) {
        this.slectedFilter = filter.value;
        break;
      }
    }
    this.generateFilteredList();
  }

  generateFilteredList() {
    if(this.tasksList) {
      if(this.slectedFilter == 0) {
        this.filteredTasksList = [...this.tasksList];
      } else if (this.slectedFilter == 1) {
        this.filteredTasksList = this.tasksList.filter(task => task.completed);
      } else {
        this.filteredTasksList = this.tasksList.filter(task => !task.completed);
      }
    }
  }

  changeVisualization($event:string) {
    if($event === 'Tabla') {
      this.showContentAsCard = false;
    } else {
      this.showContentAsCard = true;
    }
  }

}

