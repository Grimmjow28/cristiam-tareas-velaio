import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IResponsiveTableKeyLabel } from 'src/app/interfaces/responsive.table.interfaces';
import { MainButtonComponent } from '../main-button/main-button.component';
import { ComplexElementTableComponent } from '../../molecules/complex-element-table/complex-element-table.component';

@Component({
  selector: 'app-responsive-table',
  standalone: true,
  imports: [CommonModule, MainButtonComponent, ComplexElementTableComponent, MainButtonComponent],
  templateUrl: './responsive-table.component.html',
  styleUrls: ['./responsive-table.component.scss']
})
export class ResponsiveTableComponent implements OnChanges {

  @Input() replaceLabels: IResponsiveTableKeyLabel[] | undefined;
  @Input() useButtonsOnTheFields: string[] | undefined; 
  @Input() elementsToShow: any[] | undefined;
  @Input() elementsForPage: number = 10;
  actualPage: number = 1;
  startElement: number = 0;
  endElement: number = this.elementsForPage;

  startElementToShow: number = 0;
  endElementToShow: number = this.elementsForPage;

  elementsToShowPage: any[] | undefined;
  listKeys: string[] = [];
  isComplex: string[] = [];

  ngOnChanges(): void {
    this.generateListOfKeys();
  }

  generateListOfKeys() {
    this.endElement = this.elementsForPage;
    if(this.elementsToShow && this.elementsToShow.length > 0) {
      let keys = Object.keys(this.elementsToShow[0]);
      this.listKeys = this.sortKeyList(keys);
      this.elementsToShowPage = this.generatePage();
    }
  }

  sortKeyList(keys: string[]) {
    let returnedKey = [...keys];
    if(this.replaceLabels && this.replaceLabels.length > 0) {
      this.replaceLabels.sort((a,b) => { return a.position - b.position });
      returnedKey =[];
      this.isComplex = [];
      this.replaceLabels.forEach(elementKeySorted => {
        returnedKey.push(elementKeySorted.key);
        if(elementKeySorted.isComplex) {
          this.isComplex.push(elementKeySorted.key)
        }
      });

    }  
    return returnedKey;
  }

  generatePage() {
    this.startElementToShow = (this.endElement * this.actualPage) - this.elementsForPage;
    this.endElementToShow = this.endElement * this.actualPage;
    return this.elementsToShow!.slice(this.startElementToShow , this.endElementToShow);
  }

  catChButton(event: string) {
    if(event.includes('Anterior')) {
      this.actualPage = this.actualPage -1;
      if(this.actualPage < 1) this.actualPage = 1;
    } else if(event.includes('Siguiente')) {
      this.actualPage = this.actualPage +1;
    }
    this.elementsToShowPage = this.generatePage();
  }
}
