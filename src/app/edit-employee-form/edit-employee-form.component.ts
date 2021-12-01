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
    let firstName = (document.getElementById("fn") as HTMLInputElement);
    let lastName = (document.getElementById("ln") as HTMLInputElement);
    if(!firstName|| !lastName){
        alert("Please fill first name and last name");
    }
    //edit data http.put
  }

  closeDialog(){
    this.matDialog.closeAll();
  }

}
