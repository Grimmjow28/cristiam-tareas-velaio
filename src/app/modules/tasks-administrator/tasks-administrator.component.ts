import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from 'src/app/shared-elements/services/client.service';

@Component({
  selector: 'app-tasks-administrator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks-administrator.component.html',
  styleUrls: ['./tasks-administrator.component.scss']
})
export class TasksAdministratorComponent implements OnInit {

  constructor(private clientService: ClientService) {  }

  ngOnInit(): void {
    this.getTasksList();
  }

  getTasksList() {
    this.clientService.getTasksList().subscribe(tasksList => {
      console.log(tasksList)
    });
  }

}
