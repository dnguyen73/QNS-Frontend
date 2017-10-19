import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../../shared/services/products.service";
import { Product } from "../../shared/models/product";
declare var $: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  productID: number;
  products: Product[] = [];

  constructor(private route: ActivatedRoute, private _router: Router, private productSvc: ProductService) {
  }

  ngOnInit(){
    this.route.params.subscribe(
        params => {
          this.fetchProducts(+params['id']);
        }
    );
  }

  ngAfterViewInit(){
    $('.zoomContainer').remove();
  }

  //Get all products belong to given parent id
  fetchProducts(parentId: number) {
    this.productSvc.getProductsByParentId(parentId)
      .subscribe((products) => this.products = products);
  }

  viewDetail(product: Product){
    this._router.navigate(['product', product.productCode]);
  }

}
