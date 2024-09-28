import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Itask } from 'src/app/interfaces/Itask';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private _htppClient: HttpClient) { }

  getTasksList(): Observable<Itask[]> {
    return this._htppClient.get<Itask[]>('https://jsonplaceholder.typicode.com/todos');
  }
}
