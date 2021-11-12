import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Employee } from '../Model/Employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees!: Array<Employee>;
  selectedEmployee!: Employee;

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.employees = this.dataService.employees;
    this.route.queryParams.subscribe(
      (params) => {
        const first_name = params['first_name'];
        if(first_name){
          this.selectedEmployee = this.employees.find( employee => employee.first_name === first_name);
        }
      }
    );
  }

  setEmployee(first_name: string){
    this.router.navigate(['employee', 'employee-details'], {queryParams: {first_name} } );
  }

}
