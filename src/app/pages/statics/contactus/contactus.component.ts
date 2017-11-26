import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContactusComponent implements OnInit {
  lat: number = 10.696455;
  lng: number = 106.824715;
  constructor() { }

  ngOnInit() {
  }

}
