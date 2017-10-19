import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject, Subscriber} from 'rxjs';
import { of } from 'rxjs/observable/of';
import { Product } from "../models/product";
import { CartItem } from "../models/cartitem";
@Injectable()
export class CartService {
  private itemsInCartSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject([]);
  private itemsInCart: CartItem[] = [];

  constructor() {
    this.itemsInCartSubject.subscribe(_ => this.itemsInCart = _);
  }

  public addItemToCart(item: CartItem) {
    this.itemsInCartSubject.next([...this.itemsInCart, item]);
  }

  public addItemsToCart(items: CartItem[]) {
    for(let item of items){
      this.itemsInCartSubject.next([...this.itemsInCart, item]);
    }
  }

  public removeFromCart(item: CartItem) {
    const currentItems = [...this.itemsInCart];
    //const itemsWithoutRemoved = currentItems.filter(_ => _.id !== item.id);
    //this.itemsInCartSubject.next(itemsWithoutRemoved);
  }

  public removeItem(itemIndex: number){
    let currentItems = [...this.itemsInCart];
    currentItems.splice(itemIndex, 1);
    this.itemsInCartSubject.next(currentItems);
  }

  public clear(): void {
    this.itemsInCartSubject.next([]);
  }

  public getItems(): Observable<CartItem[]> {
    return this.itemsInCartSubject.asObservable();
  }

  public updateQuantity(itemIndex: number, qty: number){
    let currentItems = [...this.itemsInCart];
    currentItems[itemIndex].quantity = qty;
    this.itemsInCartSubject.next(currentItems);
  }

  public getTotalAmount(): Observable<number> {
    return this.itemsInCartSubject.map((items: CartItem[]) => {
      return items.reduce((prev, curr: CartItem) => {
        return prev + (curr.unitPrice * curr.quantity);
      }, 0);
    });
  }
}