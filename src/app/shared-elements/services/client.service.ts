import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Itask } from 'src/app/interfaces/Itask';
import { combineLatest, Observable, zip } from 'rxjs';
import { StoreService } from './store.service';
import { IUser } from 'src/app/interfaces/IUser';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private _htppClient: HttpClient, private _storeService: StoreService ) { }

  getTasksList() {
    let taskList = this._htppClient.get<Itask[]>('https://jsonplaceholder.typicode.com/todos');
    let users = this._htppClient.get<IUser[]>('https://jsonplaceholder.typicode.com/users');

    zip(taskList, users).subscribe(
      ([taskList, users]: [Itask[], IUser[]]) => {
        taskList.forEach(task => {
          let user = users.filter(user => user.id == task.userId)[0];
          task.userName = user.name;
        })
        this._storeService.setTaskList(taskList);
        this._storeService.setUserList(users);
      }
    );
  }

  getUserList() {
    this._htppClient.get<IUser[]>('https://jsonplaceholder.typicode.com/users').subscribe(users => {
      this._storeService.setUserList(users);
    })
  }
}
