import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { DataService } from '../data.service';
import { Employee } from '../Model/Employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('0.1s ease-out',
                    style({ opacity: 0 }))
          ]
        ),
        transition(
          '* => *',
          [
            style({ opacity: 0 }),
            animate('0.1s ease-in',
                    style({ opacity: 1 }))
          ]
        )
      ]
    )
  ]
})
export class EmployeesComponent implements OnInit {

  @Input()
  employees!: Array<Employee>;
  employeesAJ!: Array<Employee>;
  searchText = '';

  constructor(public dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.employees = this.dataService.employees;
  }

  setEmployee(first_name: string){
    this.dataService.selectedEmployee = this.employees.find( employee => employee.first_name === first_name);
  }

}
