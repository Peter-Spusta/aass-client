import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../types/employee';
import { Role } from '../types/role';
import { Task } from '../types/task';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  @Input() employee!: Employee;

  tasks: Task[] = [];
  roles: Role[] = [];
  update: boolean = false;
  
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getRoles();
    this.getTasks();
    this.update = false;
  }

  updateEmployee() {
    this.update = true;
  }

  getTasks() {
    this.http.get<Task[]>('/proxy/task/get', {
      params: {
        id: this.employee.id + "",
      }
    })
    .subscribe({
      next: data => {
        console.log(data);
        this.tasks = data;
      },
      error: error => {
          console.log(error);
      }
    });
  }

  getRoles() {
    this.http.get<Task[]>('/proxy/role/employee/get', {
      params: {
        id: this.employee.id + "",
      }
    })
    .subscribe({
      next: data => {
        console.log(data);
        this.roles = data;
      },
      error: error => {
          console.log(error);
      }
    });
  }

  taskClicked(roleId: number) {

  }

  addTask() {
    this.router.navigate(["role",this.employee.id])
  }

}
