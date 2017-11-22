import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
declare var $: any;

@Injectable()
export class UIService {


  constructor(private _router: Router) { }

  /**
     * Generate 9 digit order code randomly by 0..9
     * This will be generated for only new order
     */
  handleSidebarCollapse(): void {
    // if dismiss or overlay was clicked
    $('#dismiss, .overlay').on('click', function () {
      // hide the sidebar
      $('#sidebar').removeClass('active');
      // fade out the overlay
      $('.overlay').fadeOut();
      $('body').toggleClass('overflow-x-hide');
    });

    $('#sidebarCollapse .back-select a').on('click', function () {
      $('#sidebar').toggleClass('active');
      $('.overlay').fadeIn();
      $('#content').toggleClass('expanded');
      $('.collapse.in').toggleClass('in');
      $('a[aria-expanded=true]').attr('aria-expanded', 'false');
      $('body').toggleClass('overflow-x-hide');
    });
    $('.zoomContainer').remove();
  }

  handleContentFadeout(): void {
    $('#sidebar').toggleClass('active');
    $('.overlay').fadeOut();
    if (window.matchMedia("(max-width: 575px)").matches) {
      $('body').toggleClass('overflow-x-hide');
    }
  }

  handleScrollTop(): void {
    window.scrollTo(0, 0);
    this._router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

}
