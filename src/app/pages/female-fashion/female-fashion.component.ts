import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Category } from "../../shared/models/categories";
import { Router, ActivatedRoute } from "@angular/router";
import { CategoryService } from "../../shared/services/category.service";
import { PriceRange } from "../../shared/models/priceRange";
import { UIService } from "../../shared/services/ui.service";
import { ProductService } from "../../shared/services/products.service";
import { Product } from "../../shared/models/product";
import { MessageService } from "../../shared/services/message.service";
import { SizeRange } from "../../shared/models/sizeRange";
declare var $: any;
const PARENT_ID: number = 1;



@Component({
  selector: 'female-fashion',
  templateUrl: './female-fashion.component.html',
  styleUrls: ['./female-fashion.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FemaleFashionComponent implements OnInit {
  displayCategory: string = "Chọn danh mục";
  defaultCategory: Category = new Category({
    id: '',
    name: "Tất cả sản phẩm"
  });
  priceRange: PriceRange[] = [
    { min: 0, max: 1000000, label: "Tất cả giá", selected: true },
    { min: 0, max: 100000, label: "Ít hơn 100k", selected: false },
    { min: 100000, max: 200000, label: "Từ 100k đến 200k", selected: false },
    { min: 200000, max: 300000, label: "Từ 200k đến 300k", selected: false },
    { min: 300000, max: 1000000, label: "Hơn 300k", selected: false }
  ];
  sizeRange: SizeRange[] = [
    { label: "Chọn size", selected: true },
    { label: "S", selected: false },
    { label: "M", selected: false },
    { label: "L", selected: false },
    { label: "XL", selected: false },
    { label: "Free size", selected: false }
  ];
  
  selectedCategory: Category = this.defaultCategory;
  selectedPrice: PriceRange = this.priceRange[0];
  selectedSize: SizeRange = this.sizeRange[0];
  categories: Category[] = [];
  products: Product[] = [];
  tmpCategory: string = '';

  constructor(
    private _router: Router,
    private categorySvc: CategoryService,
    private productSvc: ProductService,
    private messageSvc: MessageService,
    private uiSvc: UIService
  ) { }

  ngOnInit() {
    this.tmpCategory = '';
    this.fetchCategories(PARENT_ID);
    
    //get initial category from the route params. This should be retrieved from the content component
    this.messageSvc.getFID()
      .subscribe((cid: string) => {
        this.tmpCategory = cid;
        if (cid === '') {
          this.setSelectedCategory(cid);
          this.resetPriceSelect();
          this.resetSizeSelect();
        }
      });
  }

  //Get all categories belong to given parent id
  fetchCategories(parentId: number) {
    this.categorySvc.getCategoriesByParentId(parentId)
      .subscribe((categories) => {
        categories.splice(0, 0, this.defaultCategory);
        this.categories = categories;
        //Wait for categories all loaded to set style for selected category on sidebar
        this.setSelectedCategory(this.tmpCategory);
      });
  }

  //Event handling when sub category is selected
  //Reset the price range to ALL PRICE
  //Change the URL route
  onSelect(category: Category): void {
    this.selectedCategory = category;
    this.resetPriceSelect();
    this.resetSizeSelect();

    if (category.id !== '') {
      this._router.navigate(["/female/cate", category.id]);
    } else {
      this._router.navigate(["/female"]);
    }

    this.displayCategory = category.name;
    this.uiSvc.handleContentFadeout();
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
  resetSizeSelect() {
    this.sizeRange.forEach(function (item, index) {
      item.selected = false;
    });
    this.sizeRange[0].selected = true;
    this.selectedSize = this.sizeRange[0];
    this.messageSvc.sendSizeRange(this.sizeRange[0]);
  }

  //Event Handling when price range is selected
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

  //Event Handling when price range is selected
  onSizeSelect(selectedVal: SizeRange): void {
    this.selectedSize = selectedVal;
    // //publish price range selected
    this.messageSvc.sendSizeRange(this.selectedSize);
  }

  //Set active style for the category item when the route matches
  //Pass in the category id --> set selective style for corresponding item.
  setSelectedCategory(cid) {
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].id === cid) {
        this.selectedCategory = this.categories[i];
        this.displayCategory = this.selectedCategory.name;
      }
    }
  }

  ngAfterViewInit() {
    this.uiSvc.handleSidebarCollapse();
  }

}
