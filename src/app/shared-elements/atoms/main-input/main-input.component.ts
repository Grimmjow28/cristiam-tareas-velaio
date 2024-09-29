import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IInputElement } from 'src/app/interfaces/IInputElement';

@Component({
  selector: 'app-main-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './main-input.component.html',
  styleUrls: ['./main-input.component.scss']
})
export class MainInputComponent {
  @Input() control: FormControl = new FormControl()
  @Input() controlConfiguration: IInputElement = {
    label:'',
    placeholder: '',
    type: 'text',
    errors: [
      { key: 'required', label: 'Este campo es requerido' },
    ]
  }
  @Output() catchEvent: EventEmitter<any> = new EventEmitter();
  hasError: boolean = false;

  
  content() {
    if(this.control.touched && this.control.errors && Object.keys(this.control.errors).length) {
      let errorReturned = '';
      let keys = Object.keys(this.control.errors)
      let key = keys[0];
      for(let element of this.controlConfiguration.errors) {
        if (element.key == key) {
          errorReturned = element.label;
          break;
        }
      }
      this.hasError = true;
      return errorReturned;
    } else {
      this.hasError = false;
      return ''
    }
  }


}
