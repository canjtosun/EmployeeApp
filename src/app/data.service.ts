import { Injectable } from '@angular/core';
import { Employee } from './Model/Employee';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { map, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

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
    this.employeesAJ = new Array<Employee>();
    this.employeesJZ = new Array<Employee>();

    this.http.get(this.url).pipe(map ( res => res)).subscribe(res => {
      for (const ind in res) {
        let newEmployee = new Employee(res[ind].id, res[ind].first_name, res[ind].last_name, 
          res[ind].company_name, res[ind].address, res[ind].city, res[ind].county, res[ind].postal, 
          res[ind].phone, res[ind].email, res[ind].web);
        this.employees.push(newEmployee);
        if (res[ind].first_name[0] <= 'J') {
          this.employeesAJ.push(newEmployee);
        } else if (res[ind].first_name[0] >= 'K') {
          this.employeesJZ.push(newEmployee);
        }
      }
      this.sortLists();
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


  sortLists() {
    this.employees.sort( (a,b) => a.first_name < b.first_name ? -1 : 1 );
    this.employeesAJ.sort( (a,b) => a.first_name < b.first_name ? -1 : 1 );
    this.employeesJZ.sort( (a,b) => a.first_name < b.first_name ? -1 : 1 );
  }
  
  getValues(data) {
    return Object.keys(data).map((key) => {return data[key]});
  }

  addEmployee(data) {
    this.http.post(this.url, data).subscribe((res:any) => {
      this.employees.push(res);
      if (res.first_name[0] <= 'J') {
        this.employeesAJ.push(res);
      } else if (res.first_name[0] >= 'K') {
        this.employeesJZ.push(res);
      }
      this.sortLists();
    });
  }

  changeEmployee(data) {
    this.http.put(this.url + "/" + data.id, data).subscribe(res => {
      this.employees = this.employees.filter(val => val.id !== this.selectedEmployee.id);
      if (this.selectedEmployee.first_name[0] <= 'J') {
        this.employeesAJ = this.employeesAJ.filter(val => val.id !== this.selectedEmployee.id);
      } else if (this.selectedEmployee.first_name[0] >= 'K') {
        this.employeesJZ = this.employeesJZ.filter(val => val.id !== this.selectedEmployee.id);
      }
      this.employees.push(data);
      if (data.first_name[0] <= 'J') {
        this.employeesAJ.push(data);
      } else if (data.first_name[0] >= 'K') {
        this.employeesJZ.push(data);
      }
      this.selectedEmployee = data;
      this.sortLists();
    });
  }

  //how to remove object/employee from json link ?
  removeEmployee(){
    this.http.delete(this.url+'/'+this.selectedEmployee.id).subscribe(res => {
      this.employees = this.employees.filter(val => val.id !== this.selectedEmployee.id);
      if (this.selectedEmployee.first_name[0] <= 'J') {
        this.employeesAJ = this.employeesAJ.filter(val => val.id !== this.selectedEmployee.id);
      } else if (this.selectedEmployee.first_name[0] >= 'K') {
        this.employeesJZ = this.employeesJZ.filter(val => val.id !== this.selectedEmployee.id);
      }
      this.selectedEmployee = null;
    });
  }

}

