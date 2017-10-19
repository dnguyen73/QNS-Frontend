import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CartService } from "../../shared/services/cart.service";
import { Observable } from "rxjs/Rx";
import { Product } from "../../shared/models/product";
import { Router } from "@angular/router";
import { CartItem } from "../../shared/models/cartitem";

@Component({
  selector: 'qns-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  public shoppingCartItems$: Observable<CartItem[]>;
  constructor(private cartSvc: CartService,  private _router: Router) { }

  ngOnInit() {
    this.shoppingCartItems$ = this.cartSvc.getItems();
    this.shoppingCartItems$.subscribe(_ => _);
  }

  gotoShoppingCart(){
    this._router.navigate(['cart']);
  }

}
