import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-employee-form',
  templateUrl: './add-employee-form.component.html',
  styleUrls: ['./add-employee-form.component.css']
})
export class AddEmployeeFormComponent implements OnInit {

  newEmployee: any;

  constructor(public dataService: DataService, private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  getInformation(){
    const firstName = document.getElementById('fn') as HTMLInputElement;
    const lastName = document.getElementById('ln') as HTMLInputElement;
    const company = document.getElementById('company') as HTMLInputElement;
    const address = document.getElementById('address') as HTMLInputElement;
    const city = document.getElementById('city') as HTMLInputElement;
    const county = document.getElementById('county') as HTMLInputElement;
    const postal = document.getElementById('postal') as HTMLInputElement;
    const phone = document.getElementById('phone') as HTMLInputElement;
    const email = document.getElementById('email') as HTMLInputElement;
    const web = document.getElementById('web') as HTMLInputElement;

    this.newEmployee = {
      firstName, lastName, company, address,
      city, county, postal, phone, email, web
    };

    return this.newEmployee;

  }

  closeDialog(){
    this.matDialog.closeAll();
  }


}
