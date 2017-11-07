import { Component, OnInit, ViewEncapsulation, Input, Output } from '@angular/core';
import { Product } from "../../shared/models/product";
import { Router } from "@angular/router";
declare var $: any;

@Component({
  selector: 'product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductBoxComponent implements OnInit {

  @Input() product: Product;

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  viewDetail(product: Product) {
    this._router.navigate(['product', product.productCode]);
  }

  ngAfterViewInit() {
    $(".box-product").hover(function () {
      $(this).find(".product-action").animate({
        opacity: ".7",
      }, {
          queue: false
        });
    }, function () {
      $(this).find(".product-action").animate({
        opacity: "0",
      }, {
          queue: false
        });
    });
  }


}
