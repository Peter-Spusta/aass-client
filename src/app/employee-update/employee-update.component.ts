import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../types/employee';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.scss']
})
export class EmployeeUpdateComponent implements OnInit {
  @Input() employee!: Employee;
  @Output() close = new EventEmitter();

  locations: Location[] = [];
  choosedLocation: String = "";
  id!: number;
  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    // this.getLocations();
    //this.getLocationsSoap();
  }

  // getLocations() {
  //   this.http.get<Location[]>('/proxy/location/all')
  //   .subscribe({
  //     next: data => {
  //       console.log(data);
  //       this.locations = data;
  //     },
  //     error: error => {
  //         console.log(error);
  //     }
  //   });
  // }

  setName(e: any) {
    this.employee.name = e.target.value;
  }
  
  setAge(e: any) {
    this.employee.age = e.target.value;
  }
  
  // setLocation() {
  //   this.getLocationsSoap(this.choosedLocation).then(() => {
  //     this.project.location = this.id;
  //   });

  //   for (let location of this.locations) {
  //     if (location.name === this.choosedLocation) {
  //       this.project.location = location.id;
  //       break;
  //     }
  //   }
  // }

  saveEmployee() {
    console.log(this.employee)
    this.http.post('/proxy/employee/save', this.employee)
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

  // getLocationsSoap(location: String) {
  //   var promise = new Promise<void>((resolve, reject) => {
  //   const headers= new HttpHeaders()
  //     .set('content-type', 'text/xml')
  //     .set('Access-Control-Allow-Origin', '*')
  //     .set( 'responseType', 'text/xml' );

  //   const xml = `
  //   <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
  //                                   xmlns:gs="http://spring.io/guides/gs-producing-web-service">
  //   <soapenv:Header/>
  //   <soapenv:Body>
  //       <gs:getCountryRequest>
  //         <gs:name>`+location+`</gs:name>
  //       </gs:getCountryRequest>
  //   </soapenv:Body>
  //   </soapenv:Envelope>
  //   `;

  //   this.http.post('/proxy/ws/getCountryRequest', xml, {headers})
  //   .subscribe({
  //     next: data => {
  //       console.log(data);
  //     },
  //     error: error => {
  //         console.log(error.error.text);
  //         this.id = error.error.text.split("id>")[1].split("<")[0];
  //         resolve();
  //     }
  //   });
  //   })

  //   return promise;
  // }
}
