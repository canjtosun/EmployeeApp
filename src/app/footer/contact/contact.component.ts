import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @Input()
  isVisible: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  closePopup(){
    this.isVisible = false;
  }

}
