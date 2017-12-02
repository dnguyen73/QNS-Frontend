import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../../shared/services/products.service";
import { Product } from "../../shared/models/product";
import { MessageService } from "../../shared/services/message.service";
import { PriceRange } from "../../shared/models/priceRange";
declare var $: any; 

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit {

  @Input()
  products: Product[] = [];
  PARENT_ID: number = 1;
  p: number;
  

  tmpProducts: Product[] = [];
  selectedCID: string = "";
  selectedPriceRange: PriceRange = { min: 0, max: 1000000, label: "Tất cả giá", selected: true };

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private productSvc: ProductService,
    private messageSvc: MessageService) {

    this.messageSvc.getPriceRange()
      .subscribe((range: PriceRange) => {
        this.selectedPriceRange = range;
        this.updateProductList(range);
      });

  }

  getParentIdFromRoute(){
    var pathname =this._router.url.split('/')[1];
    switch(pathname){
      case 'female':
        this.PARENT_ID = 1;
        break;
      case 'lady':
        this.PARENT_ID = 2;
        break;
      default:
        this.PARENT_ID = 1;
        break;
    }
  }

  ngOnInit() {
    this.getParentIdFromRoute();
    this.route.params.subscribe(
      params => {
        if (!params['cid']) {
          //Get all Female products
          this.fetchProductsByParent();
          this.messageSvc.sendCID(this.selectedCID);
        } else {
          //Get all Female products under selected sub category.
          this.selectedCID = params['cid'];
          this.messageSvc.sendCID(this.selectedCID);
          this.fetchProductsByCategory(this.selectedCID);
        }

      }
    );
  }

  //Get all Female products by sub category
  fetchProductsByCategory(categoryId: string) {
    //limit top 8 latest products
    this.productSvc.getProductsByCategoryId(categoryId)
      .subscribe((products) => {
        this.tmpProducts = products;
        this.products = products.filter(p => {
          return (p.price >= this.selectedPriceRange.min) && (p.price <= this.selectedPriceRange.max);
        });
      });
  }

  //Get all Female products
  fetchProductsByParent() {
    this.productSvc.getProductsByParentId(this.PARENT_ID)
      .subscribe((products) => {
        this.tmpProducts = products;
        this.products = products.filter(p => {
          return (p.price >= this.selectedPriceRange.min) && (p.price <= this.selectedPriceRange.max);
        });
      });
  }

  //Update the product list as soon as the price range filter is selected
  updateProductList(range: PriceRange) {
    this.products = this.tmpProducts.filter(p => {
      return (p.price >= range.min) && (p.price <= range.max);
    })
  }

  ngAfterViewInit() {
    $('.zoomContainer').remove();
  }

  viewDetail(product: Product) {
    this._router.navigate(['product', product.productCode]);
  }

}
