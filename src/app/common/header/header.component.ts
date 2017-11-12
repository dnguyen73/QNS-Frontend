import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CartService } from "../../shared/services/cart.service";
import { Observable } from "rxjs/Rx";
import { Product } from "../../shared/models/product";
import { Router } from "@angular/router";
import { CartItem } from "../../shared/models/cartitem";
declare var $: any;

@Component({
  selector: 'qns-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  public shoppingCartItems$: Observable<CartItem[]>;
  constructor(private cartSvc: CartService, private _router: Router) { }

  ngOnInit() {
    this.shoppingCartItems$ = this.cartSvc.getItems();
    this.shoppingCartItems$.subscribe(_ => _);
  }

  gotoShoppingCart() {
    this._router.navigate(['cart']);
  }

  ngAfterViewInit() {
    // hide the nav bar on small screen
    // $('.nav-link').on('click', function () {
    //   $('#navbarNav').removeClass('show');
    // });

    $(function () {
      var navMain = $(".navbar-collapse"); // avoid dependency on #id
      // "a:not([data-toggle])" - to avoid issues caused
      // when you have dropdown inside navbar
      navMain.on("click", "a:not([data-toggle])", null, function () {
        navMain.collapse('hide');
      });
    });
  }

}
