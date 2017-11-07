import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Category } from "../../shared/models/categories";
import { Router } from "@angular/router";
import { CategoryService } from "../../shared/services/category.service";
declare var $: any;

@Component({
  selector: 'female-fashion',
  templateUrl: './female-fashion.component.html',
  styleUrls: ['./female-fashion.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FemaleFashionComponent implements OnInit {
  defaultCategory: Category = new Category({
    id: 0,
    name: "Tat Ca SP"
  });
  selectedCategory: Category = this.defaultCategory;
  categories: Category[] = [];
  startWithAll: boolean = true;
  constructor(private _router: Router, private categorySvc: CategoryService) { }

  ngOnInit() {
    this.fetchCategories(1);
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
      this._router.navigate(["/female", 1, category.id]);
    } else {
      this._router.navigate(["/female", 1]);
    }

    $('#sidebar').toggleClass('active');
    $('.overlay').fadeOut();
    if (window.matchMedia("(max-width: 575px)").matches) {
      $('body').toggleClass('overflow-x-hide');
    }

  }

  ngAfterViewInit() {
    // if dismiss or overlay was clicked
    $('#dismiss, .overlay').on('click', function () {
      // hide the sidebar
      $('#sidebar').removeClass('active');
      // fade out the overlay
      $('.overlay').fadeOut();
    });

    $('#sidebarCollapse i.fa-arrow-circle-left').on('click', function () {
      $('#sidebar').toggleClass('active');
      $('.overlay').fadeIn();
      $('#content').toggleClass('expanded');
      $('.collapse.in').toggleClass('in');
      $('a[aria-expanded=true]').attr('aria-expanded', 'false');
      $('body').toggleClass('overflow-x-hide');
    });
    $('.zoomContainer').remove();
  }

}
