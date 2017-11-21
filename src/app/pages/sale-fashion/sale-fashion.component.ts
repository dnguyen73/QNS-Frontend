import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Category } from "../../shared/models/categories";
import { Router } from "@angular/router";
import { CategoryService } from "../../shared/services/category.service";
import { Product } from "../../shared/models/product";
import { PriceRange } from "../../shared/models/priceRange";
import { ProductService } from "../../shared/services/products.service";
import { UIService } from "../../shared/services/ui.service";
import { MessageService } from "../../shared/services/message.service";
declare var $: any;


@Component({
  selector: 'sale-fashion',
  templateUrl: './sale-fashion.component.html',
  styleUrls: ['./sale-fashion.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SaleFashionComponent implements OnInit {
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
  tempParentId = 0;

  constructor(
    private _router: Router,
    private categorySvc: CategoryService,
    private productSvc: ProductService,
    private messageSvc: MessageService,
    private uiSvc: UIService
  ) { }

  ngOnInit() {
    this.getPrimaryCategories();
    //get initial category from the route params. This should be retrieved from the content component
    this.messageSvc.getPID()
      .subscribe((pid: number) => {
        this.tempParentId = pid;
        if (pid === 0) {
          this.setSelectedCategory(pid);
          this.resetPriceSelect();
        }
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
        setTimeout(function(){
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

    if (category.parentId !== 0) {
      this._router.navigate(["/sales", category.parentId]);
    } else {
      this._router.navigate(["/sales"]);
    }

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
      }
    }
  }

  ngAfterViewInit() {
    this.uiSvc.handleSidebarCollapse();
  }

}
