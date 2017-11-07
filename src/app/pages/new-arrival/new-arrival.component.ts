import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Category } from "../../shared/models/categories";
import { Router } from "@angular/router";
import { CategoryService } from "../../shared/services/category.service";
declare var $: any;

@Component({
  selector: 'app-new-arrival',
  templateUrl: './new-arrival.component.html',
  styleUrls: ['./new-arrival.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewArrivalComponent implements OnInit {
  selectedCategory: Category = new Category({
    id: 0,
    description: "All new products"
  });
  categories: Category[] = [ ];
  constructor(private _router: Router, private categorySvc: CategoryService) { }

  ngOnInit() {
    this.fetchCategories(1);
  }

  //Get all categories belong to given parent id
  fetchCategories(parentId: number) {
    this.categorySvc.getCategoriesByParentId(parentId)
      .subscribe((categories) => this.categories = categories);
  }
  onSelect(category: Category): void {
    this.selectedCategory = category;
    this._router.navigate(["/new", category.id]);
    $('#sidebar').toggleClass('active');
    $('.overlay').fadeOut();
    if (window.matchMedia("(max-width: 575px)").matches) {
      $('body').toggleClass('overflow-x-hide');
      /* the viewport is at least 400 pixels wide */
    }
  }

  toggleSidebar() {
    // fade in the overlay

  }

  ngAfterViewInit() {
    // if dismiss or overlay was clicked
    $('#dismiss, .overlay').on('click', function () {
      // hide the sidebar
      $('#sidebar').removeClass('active');
      // fade out the overlay
      $('.overlay').fadeOut();
    });

    $('#sidebarCollapse').on('click', function () {
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
