import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-modal.component.html',
  styleUrls: ['./main-modal.component.scss']
})
export class MainModalComponent {

  @Input() title: string = 'Agregar tarea';

}
