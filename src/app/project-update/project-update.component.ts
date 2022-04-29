import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Location } from '../types/location';
import { Project } from '../types/project';

@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: ['./project-update.component.scss']
})
export class ProjectUpdateComponent implements OnInit {
  @Input() project!: Project;
  @Output() close = new EventEmitter();

  locations: Location[] = [];
  choosedLocation: String = "";
  id!: number;
  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.getLocations();
    //this.getLocationsSoap();
  }

  getLocations() {
    this.http.get<Location[]>('/proxy/location/all')
    .subscribe({
      next: data => {
        console.log(data);
        this.locations = data;
      },
      error: error => {
          console.log(error);
      }
    });
  }

  setName(e: any) {
    this.project.name = e.target.value;
  }
  
  setDescription(e: any) {
    this.project.description = e.target.value;
  }
  
  setLocation() {
    this.getLocationsSoap(this.choosedLocation).then(() => {
      this.project.location = this.id;
    });

    for (let location of this.locations) {
      if (location.name === this.choosedLocation) {
        this.project.location = location.id;
        break;
      }
    }
  }

  saveProject() {
    console.log(this.project)
    this.http.post('/proxy/project/save', this.project)
    .subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
          console.log(error);
          this.close.emit(null);
      }
    });
  }

  getLocationsSoap(location: String) {
    var promise = new Promise<void>((resolve, reject) => {
    const headers= new HttpHeaders()
      .set('content-type', 'text/xml')
      .set('Access-Control-Allow-Origin', '*')
      .set( 'responseType', 'text/xml' );

    const xml = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                                    xmlns:gs="http://spring.io/guides/gs-producing-web-service">
    <soapenv:Header/>
    <soapenv:Body>
        <gs:getCountryRequest>
          <gs:name>`+location+`</gs:name>
        </gs:getCountryRequest>
    </soapenv:Body>
    </soapenv:Envelope>
    `;

    this.http.post('/proxy/ws/getCountryRequest', xml, {headers})
    .subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
          console.log(error.error.text);
          this.id = error.error.text.split("id>")[1].split("<")[0];
          resolve();
      }
    });
    })

    return promise;
  }
  
}
