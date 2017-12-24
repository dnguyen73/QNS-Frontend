import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { AlertComponent } from "../../common/dialog/alert.component";
import { DialogService } from "ng2-bootstrap-modal";
declare var $: any;

@Injectable()
export class UIService {


  constructor(private _router: Router, private _dialogService: DialogService) { }

  /**
     * Generate 9 digit order code randomly by 0..9
     * This will be generated for only new order
     */
  handleSidebarCollapse(): void {
    // if dismiss or overlay was clicked
    $('#dismiss, .overlay').on('click', function () {
      // hide the sidebar
      $('#sidebar').toggleClass('active');
      setTimeout(function(){
        $('#sidebar').attr('z-index', 0);
      }, 3000);
      // fade out the overlay
      $('.overlay').fadeOut();
      //$('body').removeClass('overflow-x-hide');
    });

    $('#sidebarCollapse .back-select a').on('click', function () {
      $('#sidebar').attr('z-index', 1);
      $('#sidebar').toggleClass('active');
      $('.overlay').fadeIn();
      $('#content').toggleClass('expanded');
      $('.collapse.in').toggleClass('in');
      $('a[aria-expanded=true]').attr('aria-expanded', 'false');
      //$('body').addClass('overflow-x-hide');
    });
    $('.zoomContainer').remove();
  }

  handleContentFadeout(): void {
    
    $('.overlay').fadeOut();
    if (window.matchMedia("(max-width: 575px)").matches) {
      //$('body').toggleClass('overflow-x-hide');
      $('#sidebar').toggleClass('active');
      setTimeout(function(){
        $('#sidebar').attr('z-index', 0);
      }, 3000);
      
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

  showAlert(title, message) {
    this._dialogService
      .addDialog(AlertComponent, { title: title, message: message }, { closeByClickingOutside: true, backdropColor: 'rgba(0, 0, 0, 0.5)' });
  }

}
