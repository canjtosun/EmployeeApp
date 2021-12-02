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

  rand: string = Math.floor(Math.random() * 100).toString();
  newEmployee = new Employee(0, "", "", "", "", "", "", "", "", "", "", this.dataService.picturesUrl+this.rand);

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
