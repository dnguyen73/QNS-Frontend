import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
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
  selector: 'female-product-list',
  templateUrl: './female-product-list.component.html',
  styleUrls: ['./female-product-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FemaleProductListComponent implements OnInit {

  @Input()
  products: Product[] = [];
  PARENT_ID: number = 1;
  p: number;
  totalItems: number;
  

  tmpProducts: Product[] = [];
  selectedFID: string = "";
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
    //Start loading progress
    this.loaderService.show();
    this.route.params.subscribe(
      params => {
        if (this._router.url.indexOf('cate') < 0) {
          this.p = (!params['page']) ? 1 : +params['page'];
          this.getDisplayCount();
          //Get all Female products
          this.fetchProductsByParent(this.p);
          this.messageSvc.sendFID(this.selectedFID);
        } else {
          //Get all Female products under selected sub category.
          this.selectedFID = params['fid'];
          this.p = (!params['page']) ? 1 : +params['page'];
          
          this.getDisplayCount();
          
          this.messageSvc.sendFID(this.selectedFID);
          this.fetchProductsByCategory(this.selectedFID, this.p);
        }

      }
    );
  }

  //Get total count of displaying product
  getDisplayCount() {
    if (this.selectedFID !== '') {
      this.productSvc.getCountByCategoryId(this.selectedFID)
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
          return (p.price >= this.selectedPriceRange.min) && (p.price <= this.selectedPriceRange.max);
        });
        this.loaderService.hide();
      });
  }

  //Get all Female products
  fetchProductsByParent(pagenum: number) {
    this.loaderService.show();
    this.productSvc.getProductsByParentId(this.PARENT_ID, pagenum)
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

  onPageChanged(evt){
    this.p = evt;
    if (this._router.url.indexOf('cate') > -1) {
      this._router.navigate(["/female/cate", this.selectedFID, this.p]);
    } else {
      this._router.navigate(["/female", this.p]);
    }
    
    this.uiSvc.handleScrollTop();
  }

}
