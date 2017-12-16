import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PolicyService } from "../../../shared/services/policy.service";
import { Policy } from "../../../shared/models/policy";
import { ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-qna',
  templateUrl: './qna.component.html',
  styleUrls: ['./qna.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class QnaComponent implements OnInit {
  private fragment: string;
  constructor(private policySvc: PolicyService, private route: ActivatedRoute) { }

  refundPolicy: Policy = new Policy({
    type: "refund",
    content: ""
  });
  shippingPolicy: Policy = new Policy({
    type: "shipping",
    content: ""
  });

  ngOnInit() {
    this.fetchAllPolicies();

    this.route.fragment.subscribe(fragment => {
      this.fragment = fragment;
    });
  }

  //Get all policies
  fetchAllPolicies() {
    this.policySvc.getAllPolicies()
      .subscribe((policies) => {
        if (policies.length > 0) {
          this.refundPolicy = policies.find((p) => p.type === "refund");
          this.shippingPolicy = policies.find((p) => p.type === "shipping");
        }
      });
  }

  ngAfterViewInit(): void {
    try {
      let _this = this;
      setTimeout(function () {
        //$('#' + _this.fragment).scrollIntoView();
        $('html, body').animate({
          scrollTop: $('#' + _this.fragment).offset().top
        }, 500);
      }, 1000);
    } catch (e) { }
  }

}
