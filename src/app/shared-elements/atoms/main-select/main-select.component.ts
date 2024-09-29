import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-select.component.html',
  styleUrls: ['./main-select.component.scss']
})
export class MainSelectComponent {

  @Input() selectLabel: string = 'Seleccione Por Favor'; 
  @Input() listaElementos: string[] = ['Si', 'No'];
  @Output() selected: EventEmitter<string> = new EventEmitter();

  selectedElement(event: any) {
    this.selected.emit(event.target.value);
  }
}
