import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Category } from "../../shared/models/categories";
import { Router } from "@angular/router";
import { CategoryService } from "../../shared/services/category.service";
import { PriceRange } from "../../shared/models/priceRange";
import { UIService } from "../../shared/services/ui.service";
declare var $: any;

@Component({
  selector: 'lady-fashion',
  templateUrl: './lady-fashion.component.html',
  styleUrls: ['./lady-fashion.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LadyFashionComponent implements OnInit {
  defaultCategory: Category = new Category({
    id: 0,
    name: "Tất cả sản phẩm"
  });
  priceRange: PriceRange[] = [
    { min: 0, max: 0, label: "Tất cả giá", selected: true },
    { min: 0, max: 100000, label: "Ít hơn 100k", selected: false },
    { min: 100000, max: 200000, label: "Từ 100k đến 200k", selected: false },
    { min: 200000, max: 300000, label: "Từ 200k đến 300k", selected: false },
    { min: 300000, max: 1000000, label: "Hơn 300k", selected: false }
  ];
  selectedCategory: Category = this.defaultCategory;
  selectedPrice: PriceRange = this.priceRange[0];
  categories: Category[] = [];
  startWithAll: boolean = true;


  constructor(
    private _router: Router,
    private categorySvc: CategoryService,
    private uiSvc: UIService
  ) { }

  ngOnInit() {
    this.fetchCategories(2);
  }

  //Get all categories belong to given parent id
  fetchCategories(parentId: number) {
    this.categorySvc.getCategoriesByParentId(parentId)
      .subscribe((categories) => {
        categories.splice(0, 0, this.defaultCategory);
        this.categories = categories;
      });
  }
  onSelect(category: Category): void {
    this.selectedCategory = category;
    if (category.id !== 0) {
      this._router.navigate(["/lady", 2, category.id]);
    } else {
      this._router.navigate(["/lady", 2]);
    }

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


    this.refreshProducts(this.selectedPrice);

    $('#sidebar').toggleClass('active');
    $('.overlay').fadeOut();
    if (window.matchMedia("(max-width: 575px)").matches) {
      $('body').toggleClass('overflow-x-hide');
    }

  }

  refreshProducts(priceRange: PriceRange) {

  }

  ngAfterViewInit() {
    this.uiSvc.handleSidebarCollapse();
  }

}
