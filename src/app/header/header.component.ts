import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';
import { DataService } from '../data.service';

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
            style({ height: 0, opacity: 1 }),
            animate('0.25s ease-out',
                    style({ height: 72, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 72, opacity: 1 }),
            animate('0.25s ease-out',
                    style({ height: 0, opacity: 1 }))
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
            animate('0.25s ease-out',
                    style({ "border-radius": "0px 0px 0px 0px" }))
          ]
        ),
        transition(
          ':enter',
          [
            style({ "border-radius": "0px 0px 0px 0px" }),
            animate('0.25s ease-out',
                    style({ "border-radius": "0px 0px 16px 16px" }))
          ]
        )
      ]
    )
  ]
})

export class HeaderComponent implements OnInit {

  searchText: string = '';
  searchPopup: boolean = false;

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

}
