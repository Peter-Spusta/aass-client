import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { EmployeeComponent } from './employee/employee.component';
import { TaskComponent } from './task/task.component';
import { RoleComponent } from './role/role.component';

const routes: Routes = [
  {
    path: 'project',
    component: ProjectComponent
  },
  {
    path: 'employee',
    component: EmployeeComponent
  },
  {
    path: 'task',
    component: TaskComponent
  },
  {
    path: 'role/:id',
    component: RoleComponent
  },
  {
    path: 'role',
    component: RoleComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
