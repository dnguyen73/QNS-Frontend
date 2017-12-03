import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../../shared/services/products.service";
import { Product } from "../../shared/models/product";
import { MessageService } from "../../shared/services/message.service";
import { PriceRange } from "../../shared/models/priceRange";
import { SizeRange } from "../../shared/models/sizeRange";
import { LoaderService } from "../../shared/services/loader.service";
import { Subscription } from "rxjs/Rx";
declare var $: any; 

@Component({
  selector: 'lady-product-list',
  templateUrl: './lady-product-list.component.html',
  styleUrls: ['./lady-product-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LadyProductListComponent implements OnInit {

  @Input()
  products: Product[] = [];
  PARENT_ID: number = 2;
  p: number;
  

  tmpProducts: Product[] = [];
  selectedLID: string = "";
  selectedPriceRange: PriceRange = { min: 0, max: 1000000, label: "Tất cả giá", selected: true };
  selectedSizeRange: SizeRange = { label: "Tất cả size", selected: true };
  sizeSubscription: Subscription;
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

    this.sizeSubscription = this.messageSvc.getSizeRange()
      .subscribe((sr: SizeRange) => {
        this.selectedSizeRange = sr;
        this.updateProductListBySize(sr);
      });

  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (!params['lid']) {
          //Get all Female products
          this.fetchProductsByParent();
          this.messageSvc.sendLID(this.selectedLID);
        } else {
          //Get all Female products under selected sub category.
          this.selectedLID = params['lid'];
          this.messageSvc.sendLID(this.selectedLID);
          this.fetchProductsByCategory(this.selectedLID);
        }

      }
    );
  }

  //refresh loading all products
  refreshAllProducts() {
    if (this.selectedLID !== '') {
      this.fetchProductsByCategory(this.selectedLID);
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

  //Update the product list as soon as the price range filter is selected
  updateProductListBySize(range: SizeRange) {
    if (range.label === "Chọn size") {
      //this.refreshAllProducts();
      this.products = this.tmpProducts;
    } else {
      this.products = this.tmpProducts.filter(p => {
        return (p.availableSizes.indexOf(range.label) > -1);
      })
    }
  }

  ngAfterViewInit() {
    $('.zoomContainer').remove();
  }

  viewDetail(product: Product) {
    this._router.navigate(['product', product.productCode]);
  }

  ngOnDestroy() {
    //this.messageSvc.clearSizeRange();
    this.sizeSubscription.unsubscribe();
    this.priceSubscription.unsubscribe();
  }

}
