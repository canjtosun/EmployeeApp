import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @Output()
  isModalVisible = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  closePopup(){
    this.isModalVisible.emit(false);
  }

}
