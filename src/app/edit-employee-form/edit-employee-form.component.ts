import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { Employee } from '../Model/Employee';

@Component({
  selector: 'app-edit-employee-form',
  templateUrl: './edit-employee-form.component.html',
  styleUrls: ['./edit-employee-form.component.css']
})
export class EditEmployeeFormComponent implements OnInit {

  @Input()
  employees!: Array<Employee>;
  changedEmployee: Employee;

  constructor(public dataService: DataService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.employees = this.dataService.employees;
    this.changedEmployee = this.dataService.selectedEmployee.clone();
  }

  validateFormAndSubmit(){
    this.dataService.changeEmployee(this.changedEmployee);
    this.closeDialog();
  }

  closeDialog(){
    this.matDialog.closeAll();
  }

}
