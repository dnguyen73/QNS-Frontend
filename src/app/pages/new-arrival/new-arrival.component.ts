import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Category } from "../../shared/models/categories";
import { Router } from "@angular/router";
import { CategoryService } from "../../shared/services/category.service";
import { Product } from "../../shared/models/product";
import { PriceRange } from "../../shared/models/priceRange";
import { ProductService } from "../../shared/services/products.service";
import { UIService } from "../../shared/services/ui.service";
declare var $: any;
const NUM_OF_DAYS: number = 20; //Set 7 days for selecting new products

@Component({
  selector: 'app-new-arrival',
  templateUrl: './new-arrival.component.html',
  styleUrls: ['./new-arrival.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewArrivalComponent implements OnInit {
  defaultCategory: Category = new Category({
    parentId: 0,
    name: "Tất cả sản phẩm"
  });
  priceRange: PriceRange[] = [
    { min: 0, max: 1000000, label: "Tất cả giá", selected: true },
    { min: 0, max: 100000, label: "Ít hơn 100k", selected: false },
    { min: 100000, max: 200000, label: "Từ 100k đến 200k", selected: false },
    { min: 200000, max: 300000, label: "Từ 200k đến 300k", selected: false },
    { min: 300000, max: 1000000, label: "Hơn 300k", selected: false }
  ];
  selectedCategory: Category = this.defaultCategory;
  selectedPrice: PriceRange = this.priceRange[0];
  categories: Category[] = [];
  products: Product[] = [];
  allNewProducts: Product[] = [];

  constructor(
    private _router: Router,
    private categorySvc: CategoryService,
    private productSvc: ProductService,
    private uiSvc: UIService
  ) { }

  ngOnInit() {
    this.fetchAllNewProducts();
    this.getPrimaryCategories();
  }

  //Get all main categories 
  getPrimaryCategories() {
    this.categorySvc.getPrimaryCategories()
      .subscribe((categories) => {
        categories.splice(0, 0, this.defaultCategory);
        this.categories = categories;
      });
  }

  //Get all main categories 
  fetchAllNewProducts() {
    this.productSvc.getNewProductsInPeriod(NUM_OF_DAYS)
      .subscribe((products) => {
        this.allNewProducts = products;
        this.products = products;
      });
  }
  onSelect(category: Category): void {
    this.selectedCategory = category;

    this.getDisplayProducts();

    $('#sidebar').toggleClass('active');
    $('.overlay').fadeOut();
    if (window.matchMedia("(max-width: 575px)").matches) {
      $('body').toggleClass('overflow-x-hide');
    }
  }

  onPriceSelect(selectedIndex: number): void {
    this.priceRange.forEach(function (item, index) {
      item.selected = false;
    });
    this.priceRange[selectedIndex].selected = true;
    this.selectedPrice = this.priceRange[selectedIndex];

    this.getDisplayProducts();

    $('#sidebar').toggleClass('active');
    $('.overlay').fadeOut();
    if (window.matchMedia("(max-width: 575px)").matches) {
      $('body').toggleClass('overflow-x-hide');
    }

  }

  getDisplayProducts(){
    if (this.selectedCategory.parentId > 0) {
      this.products = this.allNewProducts.filter((p) => {
        return (p.parentId === this.selectedCategory.parentId)
          && (p.price >= this.selectedPrice.min)
          && (p.price <= this.selectedPrice.max);
      });
    } else {
      this.products = this.allNewProducts.filter((p) => {
        return (p.price >= this.selectedPrice.min)
          && (p.price <= this.selectedPrice.max);
      });
    }
  }

  ngAfterViewInit() {
    this.uiSvc.handleSidebarCollapse();
  }

}
