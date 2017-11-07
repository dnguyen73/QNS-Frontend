import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import { Product } from "../../shared/models/product";
import { ProductService } from "../../shared/services/products.service";

@Component({
  selector: 'home-kids',
  templateUrl: './home-kids.component.html',
  styleUrls: ['./home-kids.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeKidsComponent implements OnInit {

  kidProducts: Product[] = [];
  constructor(private _router: Router, private productSvc: ProductService) { }

  ngOnInit() {
     this.fetchProducts(1);
  }

  //Get all products belong to given parent id
  fetchProducts(parentId: number) {
    this.productSvc.getProductsByParentId(parentId)
      .subscribe((products) => {
        this.kidProducts = products;
      });
  }

}
