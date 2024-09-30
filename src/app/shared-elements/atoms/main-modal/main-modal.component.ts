import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { MainInputComponent } from '../main-input/main-input.component';
import { IFormElement } from 'src/app/interfaces/IInputElement';
import { ModalService } from '../../services/modal.service';
import { MainButtonComponent } from "../main-button/main-button.component";
import { MainSelectComponent } from '../main-select/main-select.component';
import { StoreService } from '../../services/store.service';
import { Subject, takeUntil } from 'rxjs';
import { IUser } from 'src/app/interfaces/IUser';
import { ClientService } from '../../services/client.service';
import { ResponsiveTableComponent } from '../responsive-table/responsive-table.component';
import { IResponsiveTableKeyLabel } from 'src/app/interfaces/responsive.table.interfaces';
import { Itask } from 'src/app/interfaces/Itask';

@Component({
  selector: 'app-main-modal',
  standalone: true,
  imports: [CommonModule, MainInputComponent, FormsModule, ReactiveFormsModule, MainButtonComponent, MainSelectComponent, ResponsiveTableComponent],
  templateUrl: './main-modal.component.html',
  styleUrls: ['./main-modal.component.scss']
})
export class MainModalComponent implements OnInit{

  constructor(private modalService: ModalService, private formBuilder: FormBuilder, private storeService: StoreService,  private clientService: ClientService){}


  @Input() title: string = 'Crear Nueva Tarea';

  private readonly unsubscribe$: Subject<void> = new Subject();
  addForm: UntypedFormGroup | undefined;
  listUsers: string[] = [];
  fullList:IUser[] =[];
  addedUser: IUser[] =[];
  fulltaskList: Itask[] =[];

  formfieldList: IFormElement[] = [
    {
      control: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      complement: {
        label:'Nombre De La Tarea',
        placeholder: 'nombre de la tarea..',
        type: 'text',
        errors: [
          { key: 'required', label: 'Este campo es requerido' },
          { key: 'minlength', label: 'Minimo 5 caracteres'},
          { key: 'maxlength', label: 'Maximo 100 caracteres'}
        ]
      }
    },
    {
      control: new FormControl('', [Validators.required]),
      complement: {
        label:'Fecha Limite',
        placeholder: 'dd/mm/yyyy..',
        type: 'date',
        errors: [
          { key: 'required', label: 'Este campo es requerido' }
        ]
      }
    },
  ];


  replaceLabels: IResponsiveTableKeyLabel[] = [
    { key:'habilities', label: 'Habilidades', position: 4, isComplex: true},
    { key:'id', label: 'Id', position: 1},
    { key:'name', label: 'Nombre', position: 2},
    { key:'age', label: 'Edad', position:3},
  ];
  

  ngOnInit() {  
    this.addForm = this.formBuilder.group({
      id: this.formfieldList[0].control,
      name: this.formfieldList[1].control,
    });
    this.storeService.getUserList().pipe(takeUntil(this.unsubscribe$)).subscribe(listUsers =>{
      if(listUsers && listUsers.length > 0) {
        let groupOfUsers: string[] =[];
        listUsers.forEach(user => {
          let userElement = `${user.name} habilidades:`;
          if(user.habilities) {
            user.habilities.forEach(habi => {
              userElement = userElement + ` ${habi.label}`
            });
          }
          groupOfUsers.push(userElement);
        });
        this.listUsers = groupOfUsers;
        this.fullList = listUsers;
      }
    })
    this.storeService.gettaskList().pipe(takeUntil(this.unsubscribe$)).subscribe(listask => {
      this.fulltaskList = listask;
    });
  }

  CloseModal() {
    this.modalService.setShowModal(false);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  addUser($event: string) {
    let response = $event.split(' habilidades:')[0];
    let alreadyExist = this.addedUser.filter(user => user.name === response)
    if(!alreadyExist || alreadyExist.length === 0) {
      let oldList = [...this.addedUser];
      this.addedUser = [];
      let fullUser = this.fullList.filter(element => element.name === response)[0];
      let newUser = this.clientService.newUser(fullUser);
      oldList.push(newUser);
      this.addedUser = [...oldList];
    }

  }

  addNewUser() {
    this.modalService.setShowModalUser(true);
  }

  addTask($event: string) {
    let isString = typeof $event === 'string';
    if(isString) {
      let newTask = this.addForm?.value;
      let newTaskToAdd: Itask = {
        id: this.fulltaskList.length,
        title: newTask.name,
        user: this.addedUser,
        userId: 18,
        completed: false
      }
      let newTaskList= [...this.fulltaskList, newTaskToAdd];
      this.storeService.setTaskList(newTaskList);
      this.CloseModal();
    }
  }
}
