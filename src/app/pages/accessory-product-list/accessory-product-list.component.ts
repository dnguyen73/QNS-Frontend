import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../../shared/services/products.service";
import { Product } from "../../shared/models/product";
import { MessageService } from "../../shared/services/message.service";
import { PriceRange } from "../../shared/models/priceRange";
import { LoaderService } from "../../shared/services/loader.service";
import { Subscription } from "rxjs/Rx";
declare var $: any; 

@Component({
  selector: 'accessory-product-list',
  templateUrl: './accessory-product-list.component.html',
  styleUrls: ['./accessory-product-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AccessoryProductListComponent implements OnInit {

  @Input()
  products: Product[] = [];
  PARENT_ID: number = 4;
  p: number;
  

  tmpProducts: Product[] = [];
  selectedAID: string = "";
  selectedPriceRange: PriceRange = { min: 0, max: 1000000, label: "Tất cả giá", selected: true };
  priceSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private productSvc: ProductService,
    private messageSvc: MessageService,
    private loaderService: LoaderService) {

    this.priceSubscription = this.messageSvc.getPriceRange()
      .subscribe((range: PriceRange) => {
        this.selectedPriceRange = range;
        this.updateProductListByPrice(range);
      });

  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (!params['aid']) {
          //Get all Female products
          this.fetchProductsByParent();
          this.messageSvc.sendAID(this.selectedAID);
        } else {
          //Get all Female products under selected sub category.
          this.selectedAID = params['aid'];
          this.messageSvc.sendAID(this.selectedAID);
          this.fetchProductsByCategory(this.selectedAID);
        }

      }
    );
  }

  //refresh loading all products
  refreshAllProducts() {
    if (this.selectedAID !== '') {
      this.fetchProductsByCategory(this.selectedAID);
    } else {
      this.fetchProductsByParent();
    }
  }

  //Get all Female products by sub category
  fetchProductsByCategory(categoryId: string) {
    //limit top 8 latest products
    this.loaderService.show();
    this.productSvc.getProductsByCategoryId(categoryId)
      .subscribe((products) => {
        this.tmpProducts = products;
        this.products = products.filter(p => {
          return (p.price >= this.selectedPriceRange.min) && (p.price <= this.selectedPriceRange.max);
        });
        this.loaderService.hide();
      });
  }

  //Get all Female products
  fetchProductsByParent() {
    this.loaderService.show();
    this.productSvc.getProductsByParentId(this.PARENT_ID)
      .subscribe((products) => {
        this.tmpProducts = products;
        this.products = products.filter(p => {
          return (p.price >= this.selectedPriceRange.min) && (p.price <= this.selectedPriceRange.max);
        });
        this.loaderService.hide();
      });
  }

  //Update the product list as soon as the price range filter is selected
  updateProductListByPrice(range: PriceRange) {
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

  ngOnDestroy() {
    //this.messageSvc.clearSizeRange();
    this.priceSubscription.unsubscribe();
  }

}
