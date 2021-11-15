import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';
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
          ':enter',
          [
            style({ opacity: 0 }),
            animate('0.25s ease-in',
                    style({ opacity: 1 }))
          ]
        ),
        transition(
          '* => *',
          [
            style({ opacity: 0 }),
            animate('0.25s ease-in',
                    style({ opacity: 1 }))
          ]
        ),transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('0.25s ease-out',
                    style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class EmployeesComponent implements OnInit {

  employees!: Array<Employee>;
  searchText = '';

  constructor(public dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.employees = this.dataService.employees;
    this.route.queryParams.subscribe(
      (params) => {
        const first_name = params['first_name'];
        if(first_name){
          this.dataService.selectedEmployee = this.employees.find( employee => employee.first_name === first_name);
        }
      }
    );
  }

  setEmployee(first_name: string){
    this.router.navigate(['employee', 'employee-details'], {queryParams: {first_name} } );
  }

}
