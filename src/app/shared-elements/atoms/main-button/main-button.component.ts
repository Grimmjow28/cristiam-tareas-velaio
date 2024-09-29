import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() label: string = 'Submit'

  generateEvent() {
    this.click.emit(this.label);
  }
}
