import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IResponsiveTableKeyLabel } from 'src/app/interfaces/responsive.table.interfaces';

@Component({
  selector: 'app-responsive-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './responsive-table.component.html',
  styleUrls: ['./responsive-table.component.scss']
})
export class ResponsiveTableComponent implements OnChanges {

  @Input() replaceLabels: IResponsiveTableKeyLabel[] | undefined;
  @Input() elementsToShow: any[] | undefined;
  @Input() elementsForPage: number = 10;
  actualPage: number = 1;
  startElement: number = 0;
  endElement: number = 10;
  elementsToShowPage: any[] | undefined;
  listKeys: string[] = [];

  ngOnChanges(): void {
    this.generateListOfKeys();
  }

  generateListOfKeys() {
    console.log(this.elementsToShow);
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
      this.replaceLabels.forEach(elementKeySorted => {
        returnedKey.push(elementKeySorted.key);
      });
    }  
    return returnedKey;
  }

  generatePage() {
    let startPage = this.startElement * this.actualPage;
    let endPage = this.endElement * this.actualPage;
    return this.elementsToShow!.slice(startPage , endPage);
  }
}
