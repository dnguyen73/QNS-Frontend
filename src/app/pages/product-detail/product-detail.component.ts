import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ProductService } from "../../shared/services/products.service";
import { Product } from "../../shared/models/product";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  myProduct: Product = new Product();
  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private productSvc: ProductService
  ) { }

  ngOnInit() {
    let code = this.route.snapshot.params['code'];
    this.route.data
      .subscribe((data: { product: Product }) => {
        this.myProduct = data.product;
      });
  }

}
