import { Injectable } from '@angular/core';
import { Employee } from './Model/Employee';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { map, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// import employee_data from "../assets/employee_data.json";

@Injectable({
  providedIn: 'root',
})
export class DataService {
  employees!: Array<Employee>;
  splitValues!: Array<string>;
  fileName: string = '/assets/employee_data.xlsx';
  searchText = '';
  selectedEmployee: Employee;
  url: string = 'http://localhost:3000/EmployeeTable';
  databaseUrl: string =
    'https://my-json-server.typicode.com/sudona/employees_json/users';
  picturesUrl: string = 'https://robohash.org/';

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
    this.employees = new Array<Employee>();
    this.splitValues = new Array<string>();

    // var rand: string = Math.floor(Math.random() * 100).toString();
    // console.log(employee_data);
    // for (var entry of employee_data){
    //   rand = Math.floor(Math.random() * 100).toString();, "", {duration: 3000}
    //   if (entry.length == 10) {
    //     this.addEmployee(new Employee(0, entry[0], entry[1], entry[2], entry[3], entry[4], entry[5], entry[6], entry[7], entry[8], entry[9], this.picturesUrl+rand))
    //   }
    //   else if (entry.length == 11) {
    //     this.addEmployee(new Employee(0, entry[0], entry[1], entry[2], entry[3] + ", " + entry[4], entry[5], entry[6], entry[7], entry[8], entry[9], entry[10], this.picturesUrl+rand))
    //   }
    // }

    this.http.get(this.url).subscribe((res) => {
      for (const ind in res) {
        this.employees.push(this.makeEmployee(res[ind]));
      }
      this.sortLists();
    });
  }

  sortLists() {
    this.employees.sort((a, b) =>
      a.first_name.toLowerCase() < b.first_name.toLowerCase() ? -1 : 1
    );
  }


  addEmployee(data) {
    this.http.post(this.url, data).subscribe({
      next: (res: any) => {
        this.employees.push(this.makeEmployee(res));
        this.sortLists();
        this._snackBar.open('Added an employee successfully', '', {
          duration: 3000,
        });
      },
      error: (err) => {
        this._snackBar.open('Could not add employee', '', { duration: 3000 });
      },
    });
  }

  changeEmployee(data) {
    this.http.put(this.url + '/' + data.id, data).subscribe({
      next: (res) => {
        this.employees = this.employees.filter(
          (val) => val.id !== this.selectedEmployee.id
        );
        var changedEmployee = this.makeEmployee(data);
        this.employees.push(changedEmployee);
        this.selectedEmployee = changedEmployee;
        this.sortLists();
        this._snackBar.open('Edited employee successfully', '', {
          duration: 3000,
        });
      },
      error: (err) => {
        this._snackBar.open('Could not edit employee', '', { duration: 3000 });
      },
    });
  }

  //how to remove object/employee from json link ?
  removeEmployee() {
    this.http.delete(this.url + '/' + this.selectedEmployee.id).subscribe({
      next: (res) => {
        this.employees = this.employees.filter(
          (val) => val.id !== this.selectedEmployee.id
        );
        this.selectedEmployee = null;
        this._snackBar.open('Removed employee successfully', '', {
          duration: 3000,
        });
      },
      error: (err) => {
        this._snackBar.open('Chould not remove employee', '', {
          duration: 3000,
        });
      },
    });
  }

  private makeEmployee(data): Employee {
    return new Employee(
      data.id,
      data.first_name,
      data.last_name,
      data.company_name,
      data.address,
      data.city,
      data.county,
      data.postal,
      data.phone,
      data.email,
      data.web,
      this.picturesUrl + data.id
    );
  }
}
