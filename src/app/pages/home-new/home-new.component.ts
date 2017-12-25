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
    //fetch first page of all female newest products
     this.fetchNewProductsByParentId(1, 2);
  }

  //Get all new products belong to given parent id
  fetchNewProductsByParentId(parentId: number, pagenum?: number) {
    this.productSvc.fetchNewProductsByParentId(parentId, pagenum)
      .subscribe((products) => {
        this.newProducts = products.slice(0, 12);
      });
  }

  //Get all sale products belong to given parent id
  fetchSaleProductsByParentId(parentId: number, top?: number) {
    this.productSvc.fetchSaleProductsByParentId(parentId, top)
      .subscribe((products) => {
        this.saleProducts = products.slice(0, 12);
      });
  }

  selectNewType(type: number){
    this.forNewType = type;
    if(type === 0){
      //Show Female fashion
      this.fetchNewProductsByParentId(1, 2);
    } else if (type === 1){
      //Show Lady fashion
      this.fetchNewProductsByParentId(2, 2);
    }
  }

  selectSaleType(type: number){
    this.forSaleType = type;
    if(type === 0){
      //Show Female fashion
      this.fetchSaleProductsByParentId(1, 2);
    } else if (type === 1){
      //Show Lady fashion
      this.fetchSaleProductsByParentId(2, 2);
    }
  }

}
