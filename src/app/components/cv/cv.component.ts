import { Component } from '@angular/core';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent {

  constructor() { 
  }
  goTo(location: string): void {
    const element = document.querySelector("#" + location);
    if (element) { element.scrollIntoView(); }
  }

}
