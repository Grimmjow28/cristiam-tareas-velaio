import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private showModal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private showModalUser$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor() { }

  setShowModal(shoeModal: boolean) {
    this.showModal$.next(shoeModal);
  }
  getShowModal(){
    return this.showModal$.asObservable();
  }

  setShowModalUser(shoeModal: boolean) {
    this.showModalUser$.next(shoeModal);
  }
  getShowModalUser(){
    return this.showModalUser$.asObservable();
  }
}
