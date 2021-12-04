import { Injectable } from '@angular/core';
import { Employee } from './Model/Employee';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { map, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  employees!: Array<Employee>;
  splitValues!: Array<string>;
  fileName: string = '/assets/employee_data.xlsx';
  searchText = '';
  selectedEmployee: Employee;
  url: string = 'https://my-json-server.typicode.com/sudona/employees_json/users';
  databaseUrl: string = 'http://localhost:3000/EmployeeTable';
  picturesUrl: string = 'https://robohash.org/';

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
    this.employees = new Array<Employee>();
    this.splitValues = new Array<string>();



    //do concurrency on package.json


    this.http.get(this.databaseUrl).pipe(map ( res => res)).subscribe(res => {
      for (const ind in res) {
        let increment = 0;
        this.employees.push(this.makeEmployee(res[ind][increment++]));
      }
      this.sortLists();
    });



  }


  sortLists() {
    this.employees.sort( (a,b) => a.first_name.toLowerCase() < b.first_name.toLowerCase() ? -1 : 1 );
  }

  getValues(data) {
    return Object.keys(data).map((key) => {return data[key]});
  }

  addEmployee(data) {
    this.http.post(this.url, data).subscribe((res:any) => {
      this.employees.push(this.makeEmployee(res));
      this.sortLists();
      this._snackBar.open("Added an employee successfully");
    });
  }

  changeEmployee(data) {
    this.http.put(this.url + "/" + data.id, data).subscribe({
      next: res => {
      this.employees = this.employees.filter(val => val.id !== this.selectedEmployee.id);
      this.employees.push(data);
      this.selectedEmployee = data;
      this.sortLists();
      this._snackBar.open("Edited employee successfully");
      },
      error: err => {
        this.employees = this.employees.filter(val => val.id !== this.selectedEmployee.id);
        this.employees.push(data);
        this.selectedEmployee = data;
        this.sortLists();
        this._snackBar.open("Edited employee successfully");
      }
    });
  }

  //how to remove object/employee from json link ?
  removeEmployee(){
    this.http.delete(this.url+'/'+this.selectedEmployee.id).subscribe({
      next: res => {
        this.employees = this.employees.filter(val => val.id !== this.selectedEmployee.id);
        this.selectedEmployee = null;
        this._snackBar.open("Removed employee successfully");
      },
      error: err => {
        this.employees = this.employees.filter(val => val.id !== this.selectedEmployee.id);
        this.selectedEmployee = null;
        this._snackBar.open("Removed employee successfully");
      }
    });
  }

  private makeEmployee(data): Employee {
    return new Employee(data.id, data.first_name, data.last_name,
      data.company_name, data.address, data.city, data.county, data.postal,
      data.phone, data.email, data.web, this.picturesUrl+data.id);
  }

}

