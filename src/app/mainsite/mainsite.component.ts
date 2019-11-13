import { Component, OnInit } from '@angular/core';
import { SE } from '../directives/scroll.directive';


@Component({
  selector: 'app-mainsite',
  templateUrl: './mainsite.component.html',
  styleUrls: ['./mainsite.component.css']
})
export class MainsiteComponent implements OnInit {

  isActive = false;
  isActivefadeInDown = true;
  fixedTolbar = true;

  constructor() { }

  ngOnInit() {
  }

  public detectScroll(event: SE) {

    if (event.header) {
      this.isActive = false;
      this.isActivefadeInDown = true;
      this.fixedTolbar = true;
    }

    if (event.bottom) {
      this.isActive = true;
      this.isActivefadeInDown = false;
      this.fixedTolbar = false;
    }

  }

}
