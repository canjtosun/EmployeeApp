import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { DataService } from '../data.service';
import { Employee } from '../Model/Employee';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger(
      'inAnimation',
      [
        transition(
          ':enter',
          [
            style({ transform: 'translateY(-100%)' }),
            animate('0.1s ease-out',
                    style({ transform: 'translateY(0)' }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ transform: 'translateY(0)' }),
            animate('0.1s ease-out',
                    style({ transform: 'translateY(-100%)' }))
          ]
        )
      ]
    ),
    trigger(
      'outAnimation',
      [
        transition(
          ':leave',
          [
            style({ "border-radius": "0px 0px 16px 16px" }),
            animate('0.1s ease-out',
                    style({ "border-radius": "0px 0px 0px 0px" }))
          ]
        ),
        transition(
          ':enter',
          [
            style({ "border-radius": "0px 0px 0px 0px" }),
            animate('0.1s ease-out',
                    style({ "border-radius": "0px 0px 16px 16px" }))
          ]
        )
      ]
    )
  ]
})

export class HeaderComponent implements OnInit {


  @Input()
  searchIcon: boolean = true;
  @Input()
  displayList: boolean = true;


  searchText: string = '';
  searchPopup: boolean = false;
  @Output()
  EmployeesDisplayed = new EventEmitter<Array<Employee>>();

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  onSearchChange(){
    this.dataService.searchText = this.searchText;
  }

  popupSearch(){
    this.searchPopup = true;
    this.dataService.selectedEmployee = null;
  }

  popdownSearch(){
    this.searchPopup = false;
    this.searchText = '';
    this.onSearchChange();
  }

  resetPage(){
    this.dataService.selectedEmployee = null;
  }

  employeesAll(){
    this.EmployeesDisplayed.emit(this.dataService.employees);
  }

  employeesAJ(){
    this.EmployeesDisplayed.emit(this.dataService.employeesAJ);
  }

  employeesKZ(){
    this.EmployeesDisplayed.emit(this.dataService.employeesJZ);
  }
}
