import { Component, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'app';
  isCollapse = false;
  @ViewChild('sidebar') el:ElementRef;

  toggleSidebar() {
    //this.el.nativeElement.toggleClass('active');
    //this.isCollapse = !this.isCollapse;
    // fade in the overlay
        $('.overlay').fadeIn();
        $('#content').toggleClass('expanded');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');    
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
    });
  }
  
  
}
