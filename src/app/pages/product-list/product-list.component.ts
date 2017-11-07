import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../../shared/services/products.service";
import { Product } from "../../shared/models/product";
declare var $: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit {

  productID: number;
  products: Product[] = [];

  constructor(private route: ActivatedRoute, private _router: Router, private productSvc: ProductService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (params['parentId']) {
          if (!params['cid']) {
            this.fetchProducts(params['parentId']);
          } else {
            this.fetchProductsByCategory(params['cid']);
          }
        }
      }
    );
  }

  ngAfterViewInit() {
    $('.zoomContainer').remove();
  }

  //Get all products belong to given parent id
  fetchProducts(parentId: number) {
    this.productSvc.getProductsByParentId(parentId)
      .subscribe((products) => {
        this.products = products;
      });
  }

  //Get all products belong to given parent id
  fetchProductsByCategory(categoryId: string) {
    this.productSvc.getProductsByCategoryId(categoryId)
      .subscribe((products) => this.products = products);
  }

  viewDetail(product: Product) {
    this._router.navigate(['product', product.productCode]);
  }

}
