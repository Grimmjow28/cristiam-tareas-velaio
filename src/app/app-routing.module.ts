import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tasks-administrator',
    loadComponent: () => import('./modules/tasks-administrator/tasks-administrator.component')
      .then(component => component.TasksAdministratorComponent)
  },
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./modules/tasks-administrator/tasks-administrator.component')
      .then(component => component.TasksAdministratorComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./modules/tasks-administrator/tasks-administrator.component')
      .then(component => component.TasksAdministratorComponent)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
