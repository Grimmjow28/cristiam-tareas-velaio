import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Itask } from 'src/app/interfaces/Itask';
import { IUser } from 'src/app/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private taskList$: BehaviorSubject<Itask[]> = new BehaviorSubject<Itask[]>([] as Itask[]);
  private users$: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([] as IUser[]);

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
  
}
