import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { MainInputComponent } from '../main-input/main-input.component';
import { IFormElement } from 'src/app/interfaces/IInputElement';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-main-modal',
  standalone: true,
  imports: [CommonModule, MainInputComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './main-modal.component.html',
  styleUrls: ['./main-modal.component.scss']
})
export class MainModalComponent {

  constructor(private modalService: ModalService){}

  @Input() title: string = 'Crear Nueva Tarea';

  addForm: UntypedFormGroup | undefined;

  formfieldList: IFormElement[] = [
    {
      control: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
      complement: {
        label:'Nombre De La Tarea',
        placeholder: 'nombre de la tarea..',
        type: 'text',
        errors: [
          { key: 'required', label: 'Este campo es requerido' },
          { key: 'minlength', label: 'Minimo 6 caracteres'},
          { key: 'maxlength', label: 'Maximo 200 caracteres'}
        ]
      }
    },
  ];


  CloseModal() {
    this.modalService.setShowModal(false);
  }

}
