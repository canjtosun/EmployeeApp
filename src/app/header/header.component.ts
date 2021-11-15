import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';
import { DataService } from '../data.service';
import { Employee } from '../Model/Employee';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger(
      'inAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 1 }),
            animate('0.25s ease-out',
                    style({ height: 72, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 72, opacity: 1 }),
            animate('0.25s ease-out',
                    style({ height: 0, opacity: 1 }))
          ]
        )
      ]
    ),
    trigger(
      'outAnimation',
      [
        transition(
          ':leave',
          [
            style({ "border-radius": "0px 0px 16px 16px" }),
            animate('0.25s ease-out',
                    style({ "border-radius": "0px 0px 0px 0px" }))
          ]
        ),
        transition(
          ':enter',
          [
            style({ "border-radius": "0px 0px 0px 0px" }),
            animate('0.25s ease-out',
                    style({ "border-radius": "0px 0px 16px 16px" }))
          ]
        )
      ]
    )
  ]
})

export class HeaderComponent implements OnInit {

  employees: Array<Employee>;
  selectedEmployee: Employee;
  searchword: string;
  searchPopup: boolean = false;

  @Output() searchcriteria = new EventEmitter<String>();
  searchThis() {
      this.searchcriteria.emit(this.searchword)
  }

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

  findEmployee(){
    this.router.navigate(['employee', 'employee-details']);
  }

  popupSearch(){
    this.searchPopup = true;
  }

  popdownSearch(){
    this.searchPopup = false;
  }

}
