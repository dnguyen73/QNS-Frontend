import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../../environments/environment';
import { Product } from "../models/product";
import { Order } from "../models/order";

const ORDER_URL: string = environment.apiUrl + '/orders';

@Injectable()
export class OrderService {

  constructor(private _http: Http) { }

  /**
     * Generate 9 digit order code randomly by 0..9
     * This will be generated for only new order
     */
  generateUid(): string {
    let _uid = "";
    let possible = "0123456789";

    for (var i = 0; i < 9; i++)
      _uid += possible.charAt(Math.floor(Math.random() * possible.length));

    return _uid;
  }

  /**
   * Add new order
   * Note: Http post request will be cold if there is not any subcribe() call
   */
  makeOrder(order: Order): Observable<Order> {
    return this._http
      .post(ORDER_URL, order)
      .map((res) => {
        return new Order(res.json());
      })
      .catch(this.handleError);
  }

  /**
   * Error handling method
   */
  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}
