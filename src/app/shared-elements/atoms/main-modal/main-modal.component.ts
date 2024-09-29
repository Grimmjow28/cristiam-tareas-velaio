import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { MainInputComponent } from '../main-input/main-input.component';
import { IFormElement } from 'src/app/interfaces/IInputElement';
import { ModalService } from '../../services/modal.service';
import { MainButtonComponent } from "../main-button/main-button.component";

@Component({
  selector: 'app-main-modal',
  standalone: true,
  imports: [CommonModule, MainInputComponent, FormsModule, ReactiveFormsModule, MainButtonComponent],
  templateUrl: './main-modal.component.html',
  styleUrls: ['./main-modal.component.scss']
})
export class MainModalComponent implements OnInit{

  constructor(private modalService: ModalService, private formBuilder: FormBuilder){}

  @Input() title: string = 'Crear Nueva Tarea';

  addForm: UntypedFormGroup | undefined;

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

  ngOnInit() {  
    this.addForm = this.formBuilder.group({
      id: this.formfieldList[0].control,
      name: this.formfieldList[1].control,
    })
  }

  CloseModal() {
    this.modalService.setShowModal(false);
  }

}
