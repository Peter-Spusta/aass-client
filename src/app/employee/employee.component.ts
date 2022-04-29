import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../types/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[] = [];
  employeeToOpen: Employee[] = [];

  constructor(
    private router : Router,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.getAllEmployee();
    this.employeeToOpen = [];
  }

  getAllEmployee() {
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

  employeeClicked(employeeId: number) {
    this.employees.forEach(p => {
      if (p.id === employeeId)
       this.employeeToOpen.push(p);
    })
  }
}
