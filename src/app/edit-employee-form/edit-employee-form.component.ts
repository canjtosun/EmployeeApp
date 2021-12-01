import { fn } from '@angular/compiler/src/output/output_ast';
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

  constructor(public dataService: DataService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.employees = this.dataService.employees;
  }

  validateFormAndSubmit(){
    let fn = (document.getElementById("fn") as HTMLInputElement).value;
    if(!fn.trim()){
        alert("Please fill all the fields");
    }
    //change data
  }

  closeDialog(){
    this.matDialog.closeAll();
  }

}
