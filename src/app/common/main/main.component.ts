import { Component, OnInit } from '@angular/core';
import { LocalStorageService, SessionStorageService, SessionStorage } from 'ngx-webstorage';
import { CartService } from "../../shared/services/cart.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private cartSvc: CartService, private sessionStorage: SessionStorageService) { }

  ngOnInit() {
    //Watch the session webstorage
    // this.sessionStorage.observe('cart')
    //   .subscribe((value) => {
    //     if (value instanceof Array && value.length > 0) {
    //       this.cartSvc.addItemsToCart(value);
    //     }
    //   });
    let existingCart = this.sessionStorage.retrieve('cart');
    if (existingCart instanceof Array && existingCart.length > 0) {
      this.cartSvc.addItemsToCart(existingCart);
    }
  }

}
