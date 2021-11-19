import { Component, OnInit } from '@angular/core';
import { Employee } from '../Model/Employee';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  title = 'EmployeeApp';
  listEmployees: Array<Employee>;

  constructor(public dataService: DataService) {

  }

  ngOnInit(): void {
    this.listEmployees = this.dataService.employees;
  }

  swapEmployees(employees: Array<Employee>){
    this.listEmployees = employees;
  }

}
