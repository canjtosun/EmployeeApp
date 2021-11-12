import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Employee } from '../Model/Employee';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  employees!: Array<Employee>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.employees = this.dataService.employees;

  }

}
