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
  splitValues!: Array<string>;
  fileName: string = '/assets/employee_data.xlsx';
  searchText = '';
  selectedEmployee: Employee;
  url: string = 'https://my-json-server.typicode.com/sudona/employees_json/users';

  constructor(private http: HttpClient) {
    this.employees = new Array<Employee>();
    this.splitValues = new Array<string>();

    this.http.get(this.url).pipe(map ( res => res)).subscribe(res => {
      for (const ind in res) {
        let newEmployee = new Employee(res[ind].id, res[ind].first_name, res[ind].last_name, 
          res[ind].company_name, res[ind].address, res[ind].city, res[ind].county, res[ind].postal, 
          res[ind].phone, res[ind].email, res[ind].web);
        this.employees.push(newEmployee);
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
      this.employees.push(res);
      this.sortLists();
    });
  }

  changeEmployee(data) {
    this.http.put(this.url + "/" + data.id, data).subscribe(res => {
      this.employees = this.employees.filter(val => val.id !== this.selectedEmployee.id);
      this.employees.push(data);
      this.selectedEmployee = data;
      this.sortLists();
    });
  }

  //how to remove object/employee from json link ?
  removeEmployee(){
    this.http.delete(this.url+'/'+this.selectedEmployee.id).subscribe(res => {
      this.employees = this.employees.filter(val => val.id !== this.selectedEmployee.id);
      this.selectedEmployee = null;
    });
  }

}

