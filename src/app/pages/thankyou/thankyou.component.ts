import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { CartItem } from "../../shared/models/cartitem";
import { CartService } from "../../shared/services/cart.service";
import { environment } from "../../../environments/environment";
import { SessionStorageService } from "ngx-webstorage";
import { Order } from "../../shared/models/order";

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ThankyouComponent implements OnInit {
  public successOrderCode: string ='';
  public cartItems: CartItem[] = [];
  public orderItem: Order;
  
  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private cartSvc: CartService,
    private sessionStorage: SessionStorageService
  ) { }

  ngOnInit() {
    this.successOrderCode = this.route.snapshot.params['code'];
    //Get shopping cart info
    this.orderItem = this.sessionStorage.retrieve('tmpOrder');
    if (this.orderItem){
      this.cartItems = this.orderItem.items;
    }
    //Clear session webstorage
    this.sessionStorage.clear('tmpOrder');
  }

  public getImagePath(item: CartItem) {
    return environment.FILE_HOST_URL + "/" + item.product.parentId + "/thumb/" + item.colorPath;
  }

  public itemSubTotal(item: CartItem) {
    return item.quantity * item.product.price;
  }
}
