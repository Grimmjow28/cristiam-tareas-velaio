import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplexComponent } from './complex/complex.component';

@Component({
  selector: 'app-complex-element-table',
  standalone: true,
  imports: [CommonModule, ComplexComponent],
  templateUrl: './complex-element-table.component.html',
  styleUrls: ['./complex-element-table.component.scss']
})
export class ComplexElementTableComponent implements OnInit {

  @Input() elements: any = [];
  isArray: boolean = false;

  ngOnInit(): void {
    this.isArray = Array.isArray(this.elements);
  }
  
}
