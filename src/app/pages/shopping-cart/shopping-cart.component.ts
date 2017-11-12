import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { Product } from "../../shared/models/product";
import { CartService } from "../../shared/services/cart.service";
import { CartItem } from "../../shared/models/cartitem";
import { environment } from "../../../environments/environment";
import { ShippingInfo } from "../../shared/models/shippinginfo";
import { LocalStorageService, SessionStorageService, SessionStorage } from 'ngx-webstorage';
import { Order } from "../../shared/models/order";
import { OrderService } from "../../shared/services/order.service";
declare var $: any;

@Component({
  selector: 'qns-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShoppingCartComponent implements OnInit {

  public shoppingCartItems$: Observable<CartItem[]> = of([]);
  @SessionStorage('cart')
  public shoppingCartItems: CartItem[] = [];
  public subtotal$: Observable<number>;
  public subtotal: number = 0;
  private userInfo: ShippingInfo = {
    fullname: '',
    email: '',
    phone: '',
    province: '',
    address: ''
  };

  public orderItem: Order = new Order({
    userInfo: this.userInfo,
    orderCode: '',
    orderDate: new Date(),
    shippingFee: 20000,
    orderAmount: 0,
    totalAmount: 0,
    items: [],
    notes: '',
    paymentStatus: false
  });

  constructor(
    private cartSvc: CartService, 
    private orderSvc: OrderService, 
    private sessionStorage: SessionStorageService,
    private route: ActivatedRoute, 
    private _router: Router 
  ){
    this.shoppingCartItems$ = this
      .cartSvc
      .getItems();

    this.shoppingCartItems$.subscribe(_ => this.shoppingCartItems = _);
  }

  ngOnInit() {
    this.subtotal$ = this.cartSvc.getTotalAmount();
    this.subtotal$.subscribe(_ => this.subtotal = _);

    //Init order object
    this.orderItem.orderAmount = this.subtotal;
    this.orderItem.items = this.shoppingCartItems;

  }

  public getTotal(): Observable<number> {
    return this.cartSvc.getTotalAmount();
  }

  // public removeItem(item: CartItem) {
  //   this.cartSvc.removeFromCart(item)
  // }

  public getImagePath(item: CartItem) {
    return environment.FILE_HOST_URL + "/" + item.product.parentId + "/thumb/" + item.colorPath;
  }

  public itemSubTotal(item: CartItem) {
    return item.quantity * item.product.price;
  }

  public numOfItems() {
    let count = this.shoppingCartItems.length;
    return count + " item" + ((count > 1) ? "s" : "");
  }

  public UpQty(itemIndex: number) {
    let newQty = ++this.shoppingCartItems[itemIndex].quantity;
    this.cartSvc.updateQuantity(itemIndex, newQty);
  }

  public DownQty(itemIndex: number) {
    if (this.shoppingCartItems[itemIndex].quantity > 1) {
      let newQty = --this.shoppingCartItems[itemIndex].quantity;
      this.cartSvc.updateQuantity(itemIndex, newQty);
    }
  }

  public UpdateQty(itemIndex: number) {
    this.cartSvc.updateQuantity(itemIndex, this.shoppingCartItems[itemIndex].quantity);
  }

  public removeItem(itemIndex: number): void {
    this.cartSvc.removeItem(itemIndex);
  }

  public checkout(): void {
    this.orderItem.orderCode = this.orderSvc.generateUid();
    this.orderItem.items = this.shoppingCartItems;
    this.orderItem.userInfo = this.userInfo;
    this.orderItem.orderAmount = this.subtotal
    this.orderItem.totalAmount = this.subtotal + this.orderItem.shippingFee;

    //Call api to submit orderItem
    this.orderSvc
      .makeOrder(this.orderItem)
      .subscribe(
      (successOrder) => {
        this.sessionStorage.store('tmpOrder', this.orderItem);
        //Clear shopping cart
        this.cartSvc.clear();

        this._router.navigate(['thankyou', this.orderItem.orderCode]);
        //this._router.navigate(['thankyou']);
      }
      );
  }

  ngAfterViewInit() {
    $('.zoomContainer').remove();
  }
}
