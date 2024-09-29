import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IHabilities } from 'src/app/interfaces/Ihabilities';
import { Itask } from 'src/app/interfaces/Itask';
import { IUser } from 'src/app/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private taskList$: BehaviorSubject<Itask[]> = new BehaviorSubject<Itask[]>([] as Itask[]);
  private users$: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([] as IUser[]);
  private habilities$: BehaviorSubject<IHabilities[]> = new BehaviorSubject<IHabilities[]>([] as IHabilities[]);

  constructor() { }

  setTaskList(taskList: Itask[]) {
    this.taskList$.next(taskList);
  }
  gettaskList(){
    return this.taskList$.asObservable();
  }

  setUserList(userList: IUser[]){
    this.users$.next(userList);
  }
  getUserList(){
    return this.users$.asObservable();
  }

  setHabilities(userList: IHabilities[]){
    this.habilities$.next(userList);
  }
  getHabilities(){
    return this.habilities$.asObservable();
  }
  
}
