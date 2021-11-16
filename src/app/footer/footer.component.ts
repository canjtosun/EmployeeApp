import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  animations: [
    trigger(
    'inOutAnimationModal',
    [
      state('true', style({ opacity: 1, transform: 'translateY(0)' })),
      state('false', style({ opacity: 0, transform: 'translateY(-100%)' })),
      transition(
        'false <=> true',
        [
          animate(500)
        ]
      )
    ]
  )]
})
export class FooterComponent implements OnInit {
  routes: any;

  @Output()
  isVisible = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit(): void {

  }

  contactUs(){
    this.isVisible = true;
  }

  closePopup(isVisible: boolean){
    this.isVisible = isVisible
  }
}
