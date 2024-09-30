import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { IFormElement } from 'src/app/interfaces/IInputElement';
import { MainInputComponent } from '../main-input/main-input.component';
import { MainButtonComponent } from '../main-button/main-button.component';
import { Itask } from 'src/app/interfaces/Itask';
import { IHabilities } from 'src/app/interfaces/Ihabilities';
import { Subject, takeUntil } from 'rxjs';
import { StoreService } from '../../services/store.service';
import { MainSelectComponent } from '../main-select/main-select.component';

@Component({
  selector: 'app-modal-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MainInputComponent, MainButtonComponent, MainSelectComponent],
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss']
})
export class ModalUserComponent implements OnInit {

  constructor(private modalService: ModalService, private formBuilder: FormBuilder, private storeService: StoreService) {  }

  private readonly unsubscribe$: Subject<void> = new Subject();
  fullList:IHabilities[] =[];
  listHabilities: string[] = [];
  addedHabilities: string[] = [];
  
  userForm: UntypedFormGroup | undefined;
  habilitieForm: UntypedFormGroup | undefined;


  formfieldList: IFormElement[] = [
    {
      control: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      complement: {
        label:'Nombre Completo',
        placeholder: 'nombre completo',
        type: 'text',
        errors: [
          { key: 'required', label: 'Este campo es requerido' },
          { key: 'minlength', label: 'Minimo 5 caracteres'},
          { key: 'maxlength', label: 'Maximo 100 caracteres'}
        ]
      }
    },
    {
      control: new FormControl('', [Validators.required, Validators.min(18)]),
      complement: {
        label:'Edad',
        placeholder: 'edad',
        type: 'number',
        errors: [
          { key: 'required', label: 'Este campo es requerido' },
          { key: 'min', label: 'Este campo debe ser mayor a 18' }
        ]
      }
    },
  ];

  formfieldListHabilities: IFormElement[] = [
    {
      control: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      complement: {
        label:'Nueva Habilidad',
        placeholder: 'nueva habilidad',
        type: 'text',
        errors: [
          { key: 'required', label: 'Este campo es requerido' },
          { key: 'minlength', label: 'Minimo 5 caracteres'},
          { key: 'maxlength', label: 'Maximo 100 caracteres'}
        ]
      }
    },
  ];

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: this.formfieldList[0].control,
      age: this.formfieldList[1].control,
    });

    this.habilitieForm = this.formBuilder.group({
      habilitie: this.formfieldListHabilities[0].control,
    });


    this.storeService.getHabilities().pipe(takeUntil(this.unsubscribe$)).subscribe(listHabilities =>{
      if(listHabilities && listHabilities.length > 0) {
        let groupOfHabilities: string[] =['selecione Habilidad'];
        listHabilities.forEach(habilitie => {
          groupOfHabilities.push(habilitie.label);
        });
        this.listHabilities = groupOfHabilities;
        this.fullList = listHabilities;
      }
    })
  }

  CloseModal() {
    this.modalService.setShowModalUser(false);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  addHabilitie($event: string) {
    let alreadyExist = this.addedHabilities.includes($event);
    if(!alreadyExist && $event != '') { this.addedHabilities.push($event);}
  }

  agregarHabilidad() {
    let alreadyExist = this.addedHabilities.includes(this.habilitieForm?.value.habilitie);
    if(!alreadyExist) {
      this.addedHabilities.push(this.habilitieForm?.value.habilitie);
      this.fullList.push({id: this.fullList.length, label: this.habilitieForm?.value.habilitie});
      this.storeService.setHabilities(this.fullList);
      this.habilitieForm?.reset();
    }
  }

}
