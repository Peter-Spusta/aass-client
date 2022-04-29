import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Project } from '../types/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  projects: Project[] = [];
  projectToOpen: Project[] = [];

  constructor(
    private router : Router,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.getAllProject();
    this.projectToOpen = [];
  }

  getAllProject() {
    this.http.get<Project[]>('/proxy/project/all')
    .subscribe({
      next: data => {
        console.log(data);
        this.projects = data;
      },
      error: error => {
          console.log(error);
      }
    });
  }

  projectClicked(projectId: number) {
    this.projects.forEach(p => {
      if (p.id === projectId)
       this.projectToOpen.push(p);
    })
  }
}
