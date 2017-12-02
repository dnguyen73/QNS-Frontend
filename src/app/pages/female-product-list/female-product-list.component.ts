import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../../shared/services/products.service";
import { Product } from "../../shared/models/product";
import { MessageService } from "../../shared/services/message.service";
import { PriceRange } from "../../shared/models/priceRange";
import { SizeRange } from "../../shared/models/sizeRange";
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
  

  tmpProducts: Product[] = [];
  selectedFID: string = "";
  selectedPriceRange: PriceRange = { min: 0, max: 1000000, label: "Tất cả giá", selected: true };
  selectedSizeRange: SizeRange = { label: "Tất cả size", selected: true };

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private productSvc: ProductService,
    private messageSvc: MessageService) {

    this.messageSvc.getPriceRange()
      .subscribe((range: PriceRange) => {
        this.selectedPriceRange = range;
        this.updateProductListByPrice(range);
      });

    this.messageSvc.getSizeRange()
      .subscribe((sr: SizeRange) => {
        this.selectedSizeRange = sr;
        this.updateProductListBySize(sr);
      });

  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (!params['fid']) {
          //Get all Female products
          this.fetchProductsByParent();
          this.messageSvc.sendFID(this.selectedFID);
        } else {
          //Get all Female products under selected sub category.
          this.selectedFID = params['fid'];
          this.messageSvc.sendFID(this.selectedFID);
          this.fetchProductsByCategory(this.selectedFID);
        }

      }
    );
  }

  //refresh loading all products
  refreshAllProducts() {
    if (this.selectedFID !== '') {
      this.fetchProductsByCategory(this.selectedFID);
    } else {
      this.fetchProductsByParent();
    }
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
  updateProductListByPrice(range: PriceRange) {
    this.products = this.tmpProducts.filter(p => {
      return (p.price >= range.min) && (p.price <= range.max);
    })
  }

  //Update the product list as soon as the price range filter is selected
  updateProductListBySize(range: SizeRange) {
    if (range.label === "Chọn size") {
      this.refreshAllProducts();
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

}
