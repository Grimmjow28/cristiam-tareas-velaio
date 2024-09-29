import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Itask } from 'src/app/interfaces/Itask';
import { combineLatest, Observable, zip } from 'rxjs';
import { StoreService } from './store.service';
import { IUser } from 'src/app/interfaces/IUser';
import { IHabilities } from 'src/app/interfaces/Ihabilities';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  initialMocked: IHabilities[] =[
    {id: 0, label: 'C'},
    {id: 1, label: 'C#'},
    {id: 2, label: 'C++'},
    {id: 3, label: 'JavaScript'},
    {id: 4, label: 'Angular'},
    {id: 5, label: 'React'},
    {id: 6, label: 'Vue'},
    {id: 7, label: 'TypeScript'}
  ];

  constructor(private _htppClient: HttpClient, private _storeService: StoreService ) { }

  getTasksList() {
    let taskList = this._htppClient.get<Itask[]>('https://jsonplaceholder.typicode.com/todos');
    let users = this._htppClient.get<IUser[]>('https://jsonplaceholder.typicode.com/users');

    zip(taskList, users).subscribe(
      ([taskList, users]: [Itask[], IUser[]]) => {
        this.loadInitialMockHabilities(); // load the mock of habilitie sto select them from a list, the real solution would be load from BE and use it inside zip
        
        // mock 3 habilities for each user
        users.forEach(user => {
          let indexList = [];
          for (let i = 0; i<3; i++) {
            indexList.push(Math.floor(Math.random() * 7));
          }
          let mockedHabilityList: IHabilities[] = [];
          indexList.forEach(index =>{
            mockedHabilityList.push(this.initialMocked[index])
          });
          user.habilities = mockedHabilityList;
        });

        taskList.forEach(task => {
          let user = users.filter(user => user.id == task.userId)[0];
          task.user = user; // add the user
          task.date = new Date(); // mock the date because does not come from the BE
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

  loadInitialMockHabilities() {
    this._storeService.setHabilities(this.initialMocked);
  }
}
