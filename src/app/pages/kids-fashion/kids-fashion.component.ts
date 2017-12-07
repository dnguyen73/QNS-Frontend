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
const PARENT_ID: number = 3;


@Component({
  selector: 'kids-fashion',
  templateUrl: './kids-fashion.component.html',
  styleUrls: ['./kids-fashion.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class KidsFashionComponent implements OnInit {
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
  selectedCategory: Category = this.defaultCategory;
  selectedPrice: PriceRange = this.priceRange[0];
  selectedSize: SizeRange = this.sizeRange[0];
  categories: Category[] = [];
  girlCategories: Category[] = [];
  boyCategories: Category[] = [];
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
    this.messageSvc.getKID()
      .subscribe((kid: string) => {
        this.tmpCategory = kid;
        if (kid === '') {
          this.setSelectedCategory(kid);
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
        this.girlCategories = categories.filter(c => c.label == 'girl');
        this.boyCategories = categories.filter(c => c.label == 'boy');
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
      this._router.navigate(["/kids", category.id]);
    } else {
      this._router.navigate(["/kids"]);
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
    // this.sizeRange.forEach(function (item, index) {
    //   item.selected = false;
    // });
    // this.sizeRange[selectedIndex].selected = true;
    // this.selectedP = this.priceRange[selectedIndex];
    this.selectedSize = selectedVal;

    // //publish price range selected
    this.messageSvc.sendSizeRange(this.selectedSize);

    //this.uiSvc.handleContentFadeout();
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
