import { Injectable } from '@angular/core';
import { Employee } from './Model/Employee';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  employees!: Array<Employee>;
  fileName :string = '/assets/employee_data.xlsx';
  searchText = '';
  selectedEmployee: Employee;

  constructor() {
    this.employees = new Array<Employee>();
    fetch(this.fileName).then(
      (res) => {
        return res.arrayBuffer();
      }
    ).then(
      (res) => {
        const file = XLSX.read(res);

        const sheets = file.SheetNames;

        for(let i = 0; i < sheets.length; i++)
        {
          const temp = XLSX.utils.sheet_to_json(file.Sheets[file.SheetNames[i]])
          temp.forEach((res) => {
              //@ts-ignore
              this.employees.push(new Employee(...Object.values(res)));
          });
        }
      }
    );
  }
}
