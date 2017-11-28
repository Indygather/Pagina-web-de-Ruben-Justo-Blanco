import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {

  constructor() {
  }
  goTo(location: string): void {
    const element = document.querySelector("#" + location);
    if (element) { element.scrollIntoView({block: "start", behavior: "smooth"}); }
  }

  ngOnInit() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userFilters');
  }

}
