import { Component, Input, OnInit } from '@angular/core';
import { trigger, style, animate, transition} from '@angular/animations';
import { DataService } from '../data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddEmployeeFormComponent } from '../add-employee-form/add-employee-form.component';

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

  constructor(public dataService: DataService, public matDialog: MatDialog) { 
  }

  ngOnInit(): void {
  }

  setEmployee(first_name: string){
    this.dataService.selectedEmployee = this.dataService.employees.find( employee => employee.first_name === first_name);
  }

  openDialog() {
    this.matDialog.open(AddEmployeeFormComponent, {width: '75%', height: '75%'});
  }



}


