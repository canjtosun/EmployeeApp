import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Employee } from '../Model/Employee';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  employees: Array<Employee>;
  selectedEmployee: Employee;
  searchword: string;

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



}
