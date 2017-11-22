import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import { ProductService } from "../../shared/services/products.service";
import { Product } from "../../shared/models/product";

const NUM_OF_DAYS: number = 20;

@Component({
  selector: 'home-new',
  templateUrl: './home-new.component.html',
  styleUrls: ['./home-new.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeNewComponent implements OnInit {

  newProducts: Product[] = [];
  saleProducts: Product[] = [];
  forNewType: number = 0;
  forSaleType: number = 0;
  constructor(private _router: Router, private productSvc: ProductService) { }

  ngOnInit() {
     this.fetchNewProductsByParentId(1, NUM_OF_DAYS, 8);
     this.fetchSaleProductsByParentId(1, 8);
  }

  //Get all products belong to given parent id
  fetchProducts(parentId: number) {
    this.productSvc.getProductsByParentId(parentId)
      .subscribe((products) => {
        this.newProducts = products;
      });
  }

  

  //Get all products belong to given parent id
  fetchProductsByCategory(categoryId: string) {
    this.productSvc.getProductsByCategoryId(categoryId)
      .subscribe((products) => this.newProducts = products);
  }

  //Get all new products belong to given parent id
  fetchNewProductsByParentId(parentId: number, days: number, top?: number) {
    this.productSvc.fetchNewProductsByParentId(parentId, days, top)
      .subscribe((products) => {
        this.newProducts = products
      });
  }

  //Get all sale products belong to given parent id
  fetchSaleProductsByParentId(parentId: number, top?: number) {
    this.productSvc.fetchSaleProductsByParentId(parentId, top)
      .subscribe((products) => {
        this.saleProducts = products;
      });
  }

  selectNewType(type: number){
    this.forNewType = type;
    if(type === 0){
      //Show Female fashion
      this.fetchNewProductsByParentId(1, NUM_OF_DAYS, 8);
    } else if (type === 1){
      //Show Lady fashion
      this.fetchNewProductsByParentId(2, NUM_OF_DAYS, 8);
    }
  }

  selectSaleType(type: number){
    this.forSaleType = type;
    if(type === 0){
      //Show Female fashion
      this.fetchSaleProductsByParentId(1, 8);
    } else if (type === 1){
      //Show Lady fashion
      this.fetchSaleProductsByParentId(2, 8);
    }
  }

}
