import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../../shared/services/products.service";
import { Product } from "../../shared/models/product";
import { MessageService } from "../../shared/services/message.service";
import { PriceRange } from "../../shared/models/priceRange";
declare var $: any; 
const NUM_OF_DAYS: number = 20; //Set 7 days for selecting new products

@Component({
  selector: 'sale-product-list',
  templateUrl: './sale-product-list.component.html',
  styleUrls: ['./sale-product-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SaleProductListComponent implements OnInit {

  @Input()
  products: Product[] = [];
  p: number;
  

  tmpProducts: Product[] = [];
  selectedPID: number = 0;
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

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (!params['pid']) {
          //Get all Female products
          this.fetchAllSaleProducts();
          this.messageSvc.sendPID(this.selectedPID);
        } else {
          //Get all sales products under selected sub category.
          this.selectedPID = +params['pid'];
          this.messageSvc.sendPID(this.selectedPID);
          this.fetchSaleProductsByParentId(this.selectedPID);
        }

      }
    );
  }

  //Get all sale products from all parent categories
  fetchAllSaleProducts() {
    this.productSvc.getAllSaleProducts()
      .subscribe((products) => {
        this.tmpProducts = products;
        this.products = products.filter(p => {
          return (p.price >= this.selectedPriceRange.min) && (p.price <= this.selectedPriceRange.max);
        });
      });
  }

  //Get all Female products by sub category
  fetchSaleProductsByParentId(pId: number) {
    this.productSvc.fetchSaleProductsByParentId(pId)
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
