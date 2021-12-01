import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditEmployeeFormComponent } from 'src/app/edit-employee-form/edit-employee-form.component';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  constructor(public dataService: DataService, private matDialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(EditEmployeeFormComponent, dialogConfig);
  }

  deleteEmployee() {
    if (
      confirm(`Are you sure to delete:
    ${this.dataService.selectedEmployee.first_name} ${this.dataService.selectedEmployee.last_name}`)
    ) {
      this.dataService.removeEmployee();
    }
  }
}
