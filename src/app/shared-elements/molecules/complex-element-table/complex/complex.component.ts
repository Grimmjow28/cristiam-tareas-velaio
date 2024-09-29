import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplexElementTableComponent } from "../complex-element-table.component";

@Component({
  selector: 'app-complex',
  standalone: true,
  imports: [CommonModule, ComplexElementTableComponent],
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


  seeContent(key: string, object?: any) {
    if(!object) object = this.element;
    let stringToShow = key;
    if(Array.isArray(object[key])) {
      let array = object[key];
      let moreElements = '';
      for (let element of array) {
        let keyShow = Object.keys(element).filter(ke => ke !== 'id')[0]; // takes the first key diferent to ID
        if(moreElements != '') moreElements = moreElements + ', ';
        moreElements = moreElements + element[keyShow];
      }
      return stringToShow.concat(': ').concat(moreElements);
    } else {
      return stringToShow.concat(': ').concat(object[key]);
    }
  }

}
