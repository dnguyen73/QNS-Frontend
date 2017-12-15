import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../../environments/environment';
import { Category } from "../models/categories";

const CATEGORY_URL: string = environment.apiUrl + '/categories';
const PRIMARY_CATEGORY: any[] = [
  { parentId: 1, name: 'Thời trang nữ', route: 'female'},
  { parentId: 2, name: 'Thời trang trung niên', route: 'lady'},
  { parentId: 3, name: 'Quần áo trẻ em', route: 'kids'},
  { parentId: 4, name: 'Phụ kiện', route: 'accessory'}
]

@Injectable()
export class CategoryService {

  constructor(private _http: Http) { }

  /**
   * Grab all category items for given parentId from loopback api
   */
  getPrimaryCategories(): Observable<Category[]> {
    let list: Category[] = [];
    list = PRIMARY_CATEGORY.map((o) => {
      return new Category(o);
    });
    return Observable.of(list);
  }

  /**
   * Find Parent Category for given parentId
   */
  getPrimaryCategory(parentId: number): Observable<Category> {
    let cat: Category;
    cat = PRIMARY_CATEGORY.find((o) => {
      return o.parentId === parentId;
    });
    return Observable.of(cat);
  }
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
