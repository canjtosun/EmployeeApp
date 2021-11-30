import { Injectable } from '@angular/core';
import { Employee } from './Model/Employee';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  employees!: Array<Employee>;
  employeesAJ!: Array<Employee>;
  employeesJZ!: Array<Employee>;
  fileName: string = '/assets/employee_data.xlsx';
  searchText = '';
  selectedEmployee: Employee;
  url: string = 'https://my-json-server.typicode.com/sudona/employees_json/users';

  constructor(private http: HttpClient) {
    this.employees = new Array<Employee>();
    this.employeesAJ = Array<Employee>();
    this.employeesJZ = Array<Employee>();

    this.http.get(this.url).pipe(map ( res => res)).subscribe(res => {
      for (const ind in res) {
        this.employees.push(res[ind]);
        if (res[ind].first_name[0] <= 'J') {
          this.employeesAJ.push(res[ind]);
        } else if (res[ind].first_name[0] >= 'K') {
          this.employeesJZ.push(res[ind]);
        }
      }
    });

    // fetch(this.fileName)
    //   .then((res) => {
    //     return res.arrayBuffer();
    //   })
    //   .then((res) => {
    //     const file = XLSX.read(res);

    //     const sheets = file.SheetNames;

    //     for (let i = 0; i < sheets.length; i++) {
    //       const temp = XLSX.utils.sheet_to_json(
    //         file.Sheets[file.SheetNames[i]]
    //       );
    //       temp.forEach((res: Employee) => {
    //         this.employees.push(res);
    //       });

    //       temp.forEach((res: Employee) => {
    //         if (res.first_name[0] <= 'J') {
    //           this.employeesAJ.push(res);
    //         } else if (res.first_name[0] >= 'K') {
    //           this.employeesJZ.push(res);
    //         }
    //       });
    //     }
    //   this.employees.sort( (a,b) => a.first_name < b.first_name ? -1 : 1 );
    //   this.employeesAJ.sort( (a,b) => a.first_name < b.first_name ? -1 : 1 );
    //   this.employeesJZ.sort( (a,b) => a.first_name < b.first_name ? -1 : 1 );
    //   });
  }

  addEmployee(data) {
    this.http.post(this.url, data).subscribe((res:any) => {
      this.employees.push(res);
      if (res.first_name[0] <= 'J') {
        this.employeesAJ.push(res);
      } else if (res.first_name[0] >= 'K') {
        this.employeesJZ.push(res);
      }
    });
  }
}

