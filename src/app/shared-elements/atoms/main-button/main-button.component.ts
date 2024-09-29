import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-button.component.html',
  styleUrls: ['./main-button.component.scss']
})
export class MainButtonComponent {

  @Output() click = new EventEmitter<string>()
  @Input() label: string = 'Submit';
  @Input() activateColor: string = '';

  generateEvent() {
    this.click.emit(this.label);
  }

}
