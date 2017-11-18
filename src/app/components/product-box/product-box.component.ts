import { Component, OnInit, ViewEncapsulation, Input, Output } from '@angular/core';
import { Product } from "../../shared/models/product";
import { Router } from "@angular/router";
import { RatingService } from "../../shared/services/rating.service";
declare var $: any;

@Component({
  selector: 'product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductBoxComponent implements OnInit {

  @Input() product: Product;
  public avgRating: number = 0;

  constructor(private _router: Router, private ratingSvc: RatingService) { }

  ngOnInit() {
    //calculate product average rating
    this.ratingSvc.getReviewsByProductCode(this.product.productCode)
      .subscribe((reviews) => {
        let sum =  0;
        for (let i=0; i< reviews.length; i++){
          sum += reviews[i].rating;
        }
        this.avgRating = Math.round( (sum/reviews.length) * 10 ) / 10;
      });
  }

  viewDetail(product: Product) {
    this._router.navigate(['product', product.productCode]);
  }

  ngAfterViewInit() {
    // $(".box-product").hover(function () {
    //   $(this).find(".product-action").animate({
    //     opacity: ".7",
    //   }, {
    //       queue: false
    //     });
    // }, function () {
    //   $(this).find(".product-action").animate({
    //     opacity: "0",
    //   }, {
    //       queue: false
    //     });
    // });
  }


}
