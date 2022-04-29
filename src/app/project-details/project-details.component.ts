import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { Project } from '../types/project';
import { Role } from '../types/role';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  @Input() project!: Project;

  roles: Role[] = [];
  update: boolean = false;
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getRoles();
    this.update = false;
  }

  updateProject() {
    this.update = true;
  }

  getRoles() {
    this.http.get<Role[]>('/proxy/role/get', {
      params: {
        id: this.project.id + "",
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

  roleClicked(roleId: number) {

  }

  addRole() {
    this.router.navigate(["role",this.project.id])
  }
}
