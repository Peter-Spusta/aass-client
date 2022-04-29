import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../types/employee';
import { Role } from '../types/role';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  roles: Role[] = [];
  employees: Employee[] = [];

  choosedEmployee: Employee = {id:0,name:"Choose Employee",age:0};;
  choosedRole: Role = {id:0,name:"Choose Role",description:"Choose Role"};

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedroute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getRoles();
    this.getEmployees();
  }

  getRoles() {
    this.http.get<Role[]>('/proxy/role/all')
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

  getEmployees() {
    this.http.get<Employee[]>('/proxy/employee/all')
    .subscribe({
      next: data => {
        console.log(data);
        this.employees = data;
      },
      error: error => {
          console.log(error);
      }
    });
  }

  employeeClicked(employee: Employee) {
    this.choosedEmployee = employee;
  }

  roleClicked(role: Role) {
    this.choosedRole = role;
  }

  createRole() {
    let body = {id:undefined, idEmployee:this.choosedEmployee.id, idRole:this.choosedRole.id};
    this.http.get<String>('/proxy/role/employee/add', {
      params: {
        idEmployee: this.choosedEmployee.id + "",
        idRole: this.choosedRole.id + "",
        idProject: this.activatedroute.snapshot.paramMap.get("id") + "",
      }
    })
    .subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
          console.log(error);
      }
    });
  }
}
