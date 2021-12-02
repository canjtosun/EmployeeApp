import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { DataService } from '../data.service';
import { Employee } from '../Model/Employee';

@Component({
  selector: 'app-add-employee-form',
  templateUrl: './add-employee-form.component.html',
  styleUrls: ['./add-employee-form.component.css']
})
export class AddEmployeeFormComponent implements OnInit {

  newEmployee = new Employee(0, "", "", "", "", "", "", "", "", "", "");

  constructor(public dataService: DataService, private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  addEmployee(){
    this.dataService.addEmployee(this.newEmployee);
    this.matDialog.closeAll();
  }

  closeDialog(){
    this.matDialog.closeAll();
  }


}
