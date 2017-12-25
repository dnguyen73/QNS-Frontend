import { Component, OnInit, ViewEncapsulation, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../../shared/services/products.service";
import { Product } from "../../shared/models/product";
import { MessageService } from "../../shared/services/message.service";
import { PriceRange } from "../../shared/models/priceRange";
import { SizeRange } from "../../shared/models/sizeRange";
import { LoaderService } from "../../shared/services/loader.service";
import { Subscription } from "rxjs/Rx";
import { UIService } from "../../shared/services/ui.service";
declare var $: any;

@Component({
  selector: 'kids-product-list',
  templateUrl: './kids-product-list.component.html',
  styleUrls: ['./kids-product-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class KidsProductListComponent implements OnInit {

  @Input()
  products: Product[] = [];
  PARENT_ID: number = 3;
  p: number;
  totalItems: number;

  tmpProducts: Product[] = [];
  selectedKID: string = "";
  selectedPriceRange: PriceRange = { min: 0, max: 1000000, label: "Tất cả giá", selected: true };
  selectedSizeRange: SizeRange = { label: "Tất cả size", selected: true };
  sizeSubscription: Subscription;
  priceSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private productSvc: ProductService,
    private messageSvc: MessageService,
    private uiSvc: UIService,
    private loaderService: LoaderService) {

    this.priceSubscription = this.messageSvc.getPriceRange()
      .subscribe((pr: PriceRange) => {
        this.selectedPriceRange = pr;
        this.updateProductListByPrice(pr);
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
        if (this._router.url.indexOf('cate') < 0) {
          //Get all Female products
          this.p = (!params['page']) ? 1 : +params['page'];
          this.getDisplayCount();

          this.fetchProductsByParent(this.p);
          this.messageSvc.sendKID(this.selectedKID);
        } else {
          //Get all Female products under selected sub category.
          this.selectedKID = params['kid'];
          this.p = (!params['page']) ? 1 : +params['page'];
          
          this.getDisplayCount();
          this.messageSvc.sendKID(this.selectedKID);
          this.fetchProductsByCategory(this.selectedKID, this.p);
        }

      }
    );
  }

//Get total count of displaying product
  getDisplayCount() {
    if (this.selectedKID !== '') {
      this.productSvc.getCountByCategoryId(this.selectedKID)
        .subscribe((count) => {
          this.totalItems = count
        });
    } else {
      this.productSvc.getCountByParentId(this.PARENT_ID)
        .subscribe((count) => {
          this.totalItems = count
        });
    }
  }


  //Get all Female products by sub category
  fetchProductsByCategory(categoryId: string, pagenum: number) {
    //limit top 8 latest products
    this.loaderService.show();
    this.productSvc.getProductsByCategoryId(categoryId, pagenum)
      .subscribe((products) => {
        this.tmpProducts = products;
        this.products = products.filter(p => {
          return (p.price >= this.selectedPriceRange.min)
            && (p.price <= this.selectedPriceRange.max);
          //&& (p.availableSizes.indexOf(this.selectedSizeRange.label) > -1);
        });
        this.loaderService.hide();
        // let _t = this;
        // setTimeout(function () {
        //   _t.loaderService.hide();
        // }, 2000);
      });
  }

  //Get all Female products
  fetchProductsByParent(pagenum: number) {
    this.loaderService.show();
    this.productSvc.getProductsByParentId(this.PARENT_ID, pagenum)
      .subscribe((products) => {
        this.tmpProducts = products;
        this.products = products.filter(p => {
          return (p.price >= this.selectedPriceRange.min)
            && (p.price <= this.selectedPriceRange.max);
        });
        this.loaderService.hide();
        // let _t = this;
        // setTimeout(function () {
        //   _t.loaderService.hide();
        // }, 2000);
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
        return this.filterProductBySize(p.availableSizes, range.label);
      })
    }
  }

  //function to allow product to be returned when comparing size.
  //Sample: search by range size : 7kg - 9kg
  //Returning result can be from 5kg - 7kg and 9kg - 11kg
  filterProductBySize(productSize: string[], selectedSize: string) {
    let val: string[] = selectedSize.replace(/[kg ]/g, '').split('~');
    let selectedMin = +val[0];
    let selectedMax = +val[1];
    for (let i = 0; i < productSize.length; i++) {
      let pVal: string[] = productSize[i].replace(/[kg ]/g, '').split('~');
      let pMin = +pVal[0];
      let pMax = +pVal[1];

      //check to accept condition
      if (pMax >= selectedMin && pMin <= selectedMax) {
        return true;
      }
    }

    return false;
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

  onPageChanged(evt){
    this.p = evt;
    if (this._router.url.indexOf('cate') > -1) {
      this._router.navigate(["/kids/cate", this.selectedKID, this.p]);
    } else {
      this._router.navigate(["/kids", this.p]);
    }

    this.uiSvc.handleScrollTop();
  }

}
