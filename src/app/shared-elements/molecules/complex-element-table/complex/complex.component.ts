import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-complex',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './complex.component.html',
  styleUrls: ['./complex.component.scss']
})
export class ComplexComponent implements OnInit, OnChanges {

  keys: string[]=[];
  @Input() element: any;

  ngOnChanges(changes: SimpleChanges): void {
    if(this.element) {
      this.keys = Object.keys(this.element);
    }
  }

  ngOnInit(): void {
    if(this.element) {
      this.keys = Object.keys(this.element);
    }
  }

}
