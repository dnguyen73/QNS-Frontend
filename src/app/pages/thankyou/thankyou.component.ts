import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {
  public successOrderCode: string ='';
  constructor(
    private _router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.successOrderCode = this.route.snapshot.params['code'];
  }

}
