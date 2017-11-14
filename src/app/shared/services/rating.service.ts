import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../../environments/environment';
import { FileObject } from "../models/fileobject";
import { Size } from "../models/size";
import { Product } from "../models/product";
import { Category } from "../models/categories";
import { Review } from "../models/review";

const RATING_URL: string = environment.apiUrl + '/reviews';


@Injectable()
export class RatingService {

  constructor(private _http: Http) { }


  /**
     * Grab all product items from loopback api
     */
//   getAllProducts(): Observable<Product[]> {
//     return this._http
//       .get(RATING_URL)
//       .map(res => {
//         const product = res.json();
//         return product.map((product) => new Product(product));
//       })
//       .catch(this.handleError);
//   }

  /**
   * Grab all product items for given parentId from loopback api
   */
  getReviewsByProductCode(pCode: string): Observable<Review[]> {
    return this._http
      .get(RATING_URL)
      .map(res => {
        const reviews = res.json();
        return reviews
          .filter(r => {
            return r.status && (r.productCode === pCode);
          })
          .map((review) => new Review(review));
      })
      .catch(this.handleError);
  }

  /**
   * Add new product
   * Note: Http post request will be cold if there is not any subcribe() call
   */
  submitReview(review: Review): Observable<Review> {
    return this._http
      .post(RATING_URL, review)
      .map((res) => {
        return new Review(res.json());
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
