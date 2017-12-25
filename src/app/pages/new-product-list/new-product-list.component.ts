import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../../shared/services/products.service";
import { Product } from "../../shared/models/product";
import { MessageService } from "../../shared/services/message.service";
import { PriceRange } from "../../shared/models/priceRange";
import { SizeRange } from "../../shared/models/sizeRange";
import { Subscription } from "rxjs/Rx";
import { LoaderService } from "../../shared/services/loader.service";
import { UIService } from "../../shared/services/ui.service";
declare var $: any; 
const NUM_OF_DAYS: number = 50; //Set 7 days for selecting new products

@Component({
  selector: 'new-product-list',
  templateUrl: './new-product-list.component.html',
  styleUrls: ['./new-product-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewProductListComponent implements OnInit {

  @Input()
  products: Product[] = [];
  p: number;
  totalItems: number;

  tmpProducts: Product[] = [];
  selectedPID: number = 0;
  selectedPriceRange: PriceRange = { min: 0, max: 1000000, label: "Tất cả giá", selected: true };
  selectedSizeRange: SizeRange = { label: "Chọn size", selected: true };
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
    this.route.params.subscribe(
      params => {
        if (this._router.url.indexOf('cate') < 0) {
          this.p = (!params['page']) ? 1 : +params['page'];
          this.getDisplayCount();
          //Get all Female products
          this.fetchAllNewProducts(this.p);
          this.messageSvc.sendPID(this.selectedPID);
        } else {
          this.selectedPID = +params['pid'];
          this.p = (!params['page']) ? 1 : +params['page'];
          
          this.getDisplayCount();
          this.messageSvc.sendPID(this.selectedPID);
          this.fetchNewProductsByParentId(this.selectedPID, this.p);
        }

      }
    );
  }

  //Get total count of displaying product
  getDisplayCount() {
    if (this.selectedPID > 0) {
      this.productSvc.getCountNewestByParentId(this.selectedPID)
        .subscribe((count) => {
          this.totalItems = count
        });
    } else {
      this.productSvc.getCountAllNewest()
        .subscribe((count) => {
          this.totalItems = count
        });
    }
  }

  //Get all new products from all parent categories
  fetchAllNewProducts(pagenum: number) {
    this.loaderService.show();
    this.productSvc.getAllNewProducts(pagenum)
      .subscribe((products) => {
        this.tmpProducts = products;
        this.products = products.filter(p => {
          return (p.price >= this.selectedPriceRange.min) && (p.price <= this.selectedPriceRange.max);
        });
        this.loaderService.hide();
      });
  }

  //Get all Female products by sub category
  fetchNewProductsByParentId(pId: number, pagenum: number) {
    this.loaderService.show();
    this.productSvc.fetchNewProductsByParentId(pId, pagenum)
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
    this.sizeSubscription.unsubscribe();
    this.priceSubscription.unsubscribe();
  }

  onPageChanged(evt){
    this.p = evt;
    if (this._router.url.indexOf('cate') > -1) {
      this._router.navigate(["/new/cate", this.selectedPID, this.p]);
    } else {
      this._router.navigate(["/new", this.p]);
    }
    
    this.uiSvc.handleScrollTop();
  }

}
