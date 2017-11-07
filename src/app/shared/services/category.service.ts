import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../../environments/environment';
import { Category } from "../models/categories";

const CATEGORY_URL: string = environment.apiUrl + '/categories';

@Injectable()
export class CategoryService {

  constructor(private _http: Http) { }

  /**
   * Grab all category items for given parentId from loopback api
   */
  getCategoriesByParentId(pId: number): Observable<Category[]> {
    return this._http
      .get(CATEGORY_URL)
      .map(res => {
        const categories = res.json();
        return categories
          .filter(c => c.parentId === pId)
          .map((category) => new Category(category));
      })
      .catch(this.handleError);
  }

  /**
   * Get category name by given category id
   */
  getCategoryNameById(cid: string): Observable<string> {
    return this._http
      .get(CATEGORY_URL + "/" + cid)
      .map(res => {
        const category = res.json();
        return category.name;
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
