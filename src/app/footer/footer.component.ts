import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  routes: any;

  isVisible = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit(): void {

  }

  contactUs(){
    this.router.navigate(['contact']);
    this.isVisible = true;
  }

}
