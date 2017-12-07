import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Category } from "../../shared/models/categories";
import { Router } from "@angular/router";
import { CategoryService } from "../../shared/services/category.service";
import { Product } from "../../shared/models/product";
import { PriceRange } from "../../shared/models/priceRange";
import { ProductService } from "../../shared/services/products.service";
import { UIService } from "../../shared/services/ui.service";
import { MessageService } from "../../shared/services/message.service";
import { SizeRange } from "../../shared/models/sizeRange";
declare var $: any;
const DEFAULT_SIZE: SizeRange[] = [
  { label: "Chọn size", selected: true }
];
const F_SIZE: SizeRange[] = [
  { label: "Chọn size", selected: true },
  { label: "S", selected: false },
  { label: "M", selected: false },
  { label: "L", selected: false },
  { label: "XL", selected: false },
  { label: "Free Size", selected: false }
];
const L_SIZE: SizeRange[] = [
  { label: "Chọn size", selected: true },
  { label: "S", selected: false },
  { label: "M", selected: false },
  { label: "L", selected: false },
  { label: "XL", selected: false },
  { label: "2XL", selected: false },
  { label: "3XL", selected: false },
  { label: "Free Size", selected: false }
];

const K_SIZE: SizeRange[] = [
  { label: "Chọn size", selected: true },
  { label: "7kg ~ 9kg", selected: false },
  { label: "9kg ~ 11kg", selected: false },
  { label: "11kg ~ 13kg", selected: false },
  { label: "13kg ~ 15kg", selected: false },
  { label: "15kg ~ 17kg", selected: false },
  { label: "17kg ~ 19kg", selected: false },
  { label: "19kg ~ 21kg", selected: false },
  { label: "21kg ~ 23kg", selected: false },
  { label: "23kg ~ 25kg", selected: false },
  { label: "25kg ~ 27kg", selected: false },
  { label: "27kg ~ 29kg", selected: false },
  { label: "29kg ~ 31kg", selected: false },
  { label: "31kg ~ 33kg", selected: false },
  { label: "33kg ~ 35kg", selected: false },
  { label: "35kg ~ 37kg", selected: false },
  { label: "37kg ~ 40kg", selected: false }
];


@Component({
  selector: 'app-new-arrival',
  templateUrl: './new-arrival.component.html',
  styleUrls: ['./new-arrival.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewArrivalComponent implements OnInit {
  displayCategory: string = "Chọn danh mục";
  defaultCategory: Category = new Category({
    parentId: 0,
    name: "Tất cả sản phẩm"
  });
  sizeRange: SizeRange[] = DEFAULT_SIZE;
  priceRange: PriceRange[] = [
    { min: 0, max: 1000000, label: "Tất cả giá", selected: true },
    { min: 0, max: 100000, label: "Ít hơn 100k", selected: false },
    { min: 100000, max: 200000, label: "Từ 100k đến 200k", selected: false },
    { min: 200000, max: 300000, label: "Từ 200k đến 300k", selected: false },
    { min: 300000, max: 1000000, label: "Hơn 300k", selected: false }
  ];
  selectedCategory: Category = this.defaultCategory;
  selectedPrice: PriceRange = this.priceRange[0];
  selectedSize: SizeRange = this.sizeRange[0];
  categories: Category[] = [];
  products: Product[] = [];
  tempParentId = 0;

  constructor(
    private _router: Router,
    private categorySvc: CategoryService,
    private productSvc: ProductService,
    private messageSvc: MessageService,
    private uiSvc: UIService
  ) { }

  ngOnInit() {
    this.uiSvc.handleScrollTop();
    this.getPrimaryCategories();
    //get initial category from the route params. This should be retrieved from the content component
    this.messageSvc.getPID()
      .subscribe((pid: number) => {
        this.tempParentId = pid;
        this.setSelectedCategory(pid);
        this.resetPriceSelect();
        this.resetSizeSelect(pid);
      });
  }

  //Get all main categories 
  getPrimaryCategories() {
    this.categorySvc.getPrimaryCategories()
      .subscribe((categories) => {
        categories.splice(0, 0, this.defaultCategory);
        this.categories = categories;

        //Wait for categories all loaded to set style for selected category on sidebar
        let _t = this;
        setTimeout(function () {
          _t.setSelectedCategory(_t.tempParentId);
        }, 0)
      });
  }

  //Event handling when sub category is selected
  //Reset the price range to ALL PRICE
  //Change the URL route
  onSelect(category: Category): void {
    this.selectedCategory = category;
    this.resetPriceSelect();
    this.resetSizeSelect(category.parentId);

    if (category.parentId !== 0) {
      this._router.navigate(["/new", category.parentId]);
    } else {
      this._router.navigate(["/new"]);
    }

    this.displayCategory = category.name;
    this.uiSvc.handleContentFadeout();
  }

  //Event Handling when price range is selected
  onSizeSelect(selectedVal: SizeRange): void {
    this.selectedSize = selectedVal;
    // //publish price range selected
    this.messageSvc.sendSizeRange(this.selectedSize);
  }

  /* 
   * Reset the price select to ALL PRICE
   */
  resetPriceSelect() {
    this.priceRange.forEach(function (item, index) {
      item.selected = false;
    });
    this.priceRange[0].selected = true;
    this.selectedPrice = this.priceRange[0];
    this.messageSvc.sendPriceRange(this.priceRange[0]);
  }

  /* 
   * Reset the size select to ALL SIZE
   */
  resetSizeSelect(pid: number) {
    switch (pid) {
      case 1:
        this.sizeRange = F_SIZE;
        break;
      case 2:
        this.sizeRange = L_SIZE;
        break;
      case 3:
        this.sizeRange = K_SIZE;
        break;
      default:
        this.sizeRange = DEFAULT_SIZE;
        break;
    }
    this.selectedSize = this.sizeRange[0];
  }

  onPriceSelect(selectedIndex: number): void {
    this.priceRange.forEach(function (item, index) {
      item.selected = false;
    });
    this.priceRange[selectedIndex].selected = true;
    this.selectedPrice = this.priceRange[selectedIndex];

    //publish price range selected
    this.messageSvc.sendPriceRange(this.selectedPrice);

    this.uiSvc.handleContentFadeout();
  }

  //Set active style for the category item when the route matches
  //Pass in the parent id --> set selective style for corresponding item.
  setSelectedCategory(pid) {
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].parentId === pid) {
        this.selectedCategory = this.categories[i];
        this.displayCategory = this.selectedCategory.name;
      }
    }
  }

  ngAfterViewInit() {
    this.uiSvc.handleSidebarCollapse();
  }

}
