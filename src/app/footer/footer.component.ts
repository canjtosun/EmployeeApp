import { animate, style, transition, trigger } from '@angular/animations';
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
      transition(
        ':enter',
        [
          style({ height: 0 }),
          animate('0.25s ease-in',
                  style({ height: '100%' }))
        ]
      ),transition(
        ':leave',
        [
          style({ height: '100%' }),
          animate('0.25s ease-in',
                  style({ height: 0 }))
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
    this.router.navigate(['contact']);
    this.isVisible = true;
  }

  closePopup(isVisible: boolean){
    this.isVisible = isVisible
  }
}
