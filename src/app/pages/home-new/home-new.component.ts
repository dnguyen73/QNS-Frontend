import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import { ProductService } from "../../shared/services/products.service";
import { Product } from "../../shared/models/product";

@Component({
  selector: 'home-new',
  templateUrl: './home-new.component.html',
  styleUrls: ['./home-new.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeNewComponent implements OnInit {

  newProducts: Product[] = [];
  saleProducts: Product[] = [];
  constructor(private _router: Router, private productSvc: ProductService) { }

  ngOnInit() {
     this.fetchProducts(1);
     this.fetchSaleProducts(1);
  }

  //Get all products belong to given parent id
  fetchProducts(parentId: number) {
    this.productSvc.getProductsByParentId(parentId)
      .subscribe((products) => {
        this.newProducts = products;
      });
  }

  //Get all sale products belong to given parent id
  fetchSaleProducts(parentId: number) {
    this.productSvc.getProductsByParentId(parentId)
      .subscribe((products) => {
        this.saleProducts = products;
      });
  }

  //Get all products belong to given parent id
  fetchProductsByCategory(categoryId: string) {
    this.productSvc.getProductsByCategoryId(categoryId)
      .subscribe((products) => this.newProducts = products);
  }

}
