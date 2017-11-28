import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../../environments/environment';
import { FileObject } from "../models/fileobject";
import { Size } from "../models/size";
import { Product } from "../models/product";
import { Category } from "../models/categories";

const FILE_URL: string = environment.apiUrl + '/attachments';
const SIZE_URL: string = environment.apiUrl + '/sizes';
const PRODUCT_URL: string = environment.apiUrl + '/products';

export enum ParentCategory {
  "Thời trang nữ" = 1,
  "Thời trang trung niên",
  "Thời trang trẻ em"
}
@Injectable()
export class ProductService {

  constructor(private _http: Http) { }

  /**
   * Upload product image to given comtainer
   * Note: Http post request will be cold if there is not any subcribe() call
   */
  getAllProductSizes(): Observable<Size[]> {
    return this._http
      .get(SIZE_URL)
      .map(res => {
        const sizes = res.json();
        return sizes.map((category) => new Size(category));
      })
      .catch(this.handleError);
  }

  /**
     * Grab all product items from loopback api
     */
  getAllProducts(): Observable<Product[]> {
    return this._http
      .get(PRODUCT_URL)
      .map(res => {
        const product = res.json();
        return product.map((product) => new Product(product));
      })
      .catch(this.handleError);
  }

  /**
     * Grab all product items from loopback api
     */
  getAllSaleProducts(): Observable<Product[]> {
    return this._http
      .get(PRODUCT_URL + "/findAllSale")
      .map(res => {
        const product = res.json();
        return product.map((product) => new Product(product));
      })
      .catch(this.handleError);
  }

  /**
       * Grab all product items from loopback api
       */
  getRelatedProducts(pCode: string, top: number): Observable<Product[]> {
    return this._http
      .get(PRODUCT_URL + "/findRelation?code=" + pCode + "&top=" + top)
      .map(res => {
        const product = res.json();
        return product.map((product) => new Product(product));
      })
      .catch(this.handleError);
  }
  /**
     * Grab all product items from loopback api
     */
  getNewProductsInPeriod(days: number): Observable<Product[]> {
    return this._http
      .get(PRODUCT_URL + "/findNewestByDays?days=" + days)
      .map(res => {
        const product = res.json();
        return product.map((product) => new Product(product));
      })
      .catch(this.handleError);
  }

  // /**
  //  * Grab all product items for given parentId from loopback api
  //  */
  // getProductsByParentId(pId: number, top?: number): Observable<Product[]> {
  //   return this._http
  //     .get(PRODUCT_URL)
  //     .map(res => {
  //       const products = res.json();
  //       return products
  //         .filter(p => p.parentId === +pId)
  //         .map((product) => new Product(product));
  //     })
  //     .catch(this.handleError);
  // }

  /**
   * Grab all product items for given parentId from loopback api
   */
  getProductsByParentId(pId: number, top?: number): Observable<Product[]> {
    let reqURL: string = '';
    if (!top) {
      reqURL = PRODUCT_URL + "/findByParentId?parentId=" + pId;
    } else {
      reqURL = PRODUCT_URL + "/findByParentId?parentId=" + pId + "&top=" + top;
    }

    return this._http
      .get(reqURL)
      .map(res => {
        const products = res.json();
        return products.map((p) => new Product(p));
      })
      .catch(this.handleError);
  }

  /**
   * Grab all product items for given category Id from loopback api
   */
  getProductsByCategoryId(cId: string, top?: number): Observable<Product[]> {
    // let params: URLSearchParams = new URLSearchParams();
    // params.set('categoryId', cId);
    // params.set('top', top.toString());
    let reqURL: string = '';
    if (!top) {
      reqURL = PRODUCT_URL + "/findByCategory?categoryId=" + cId;
    } else {
      reqURL = PRODUCT_URL + "/findByCategory?categoryId=" + cId + "&top=" + top;
    }

    return this._http
      .get(reqURL)
      .map(res => {
        const products = res.json();
        return products.map((p) => new Product(p));
      })
      .catch(this.handleError);
  }

  /**
   * Grab all new product items for given parentId from loopback api
   * Optional: top --- number of product return with DATE desc
   */
  fetchNewProductsByParentId(parentId: number, days: number, top?: number): Observable<Product[]> {
    let reqURL: string = '';
    if (!top) {
      reqURL = PRODUCT_URL + "/findNewest?pid=" + parentId + "&days=" + days;
    } else {
      reqURL = PRODUCT_URL + "/findNewest?pid=" + parentId + "&days=" + days + "&top=" + top;
    }

    return this._http
      .get(reqURL)
      .map(res => {
        const products = res.json();
        return products
          .map((product) => new Product(product));
      })
      .catch(this.handleError);
  }

  /**
   * Grab all new product items for given parentId from loopback api
   * Optional: top --- number of product return with DATE desc
   */
  fetchSaleProductsByParentId(parentId: number, top?: number): Observable<Product[]> {
    let url: string = '';
    if (!top) {
      url = PRODUCT_URL + "/findSale?pid=" + parentId;
    } else {
      url = PRODUCT_URL + "/findSale?pid=" + parentId + "&top=" + top;
    }
    return this._http
      .get(url)
      .map(res => {
        const products = res.json();
        return products
          .map((product) => new Product(product));
      })
      .catch(this.handleError);
  }

  /**
   * Grab all new product items for given price range in specific Parent ID
   */
  fetchProductsByPriceInGroup(pid: number, min: number, max: number): Observable<Product[]> {
    return this._http
      .get(PRODUCT_URL + "/findByPriceRangeInGroup?pid=" + pid + "&min=" + min + "&max=" + max)
      .map(res => {
        const products = res.json();
        return products
          .map((product) => new Product(product));
      })
      .catch(this.handleError);
  }

  /**
   * Grab all new product items for given price range in specific Category
   */
  fetchProductsByPriceInCategory(cid: string, min: number, max: number): Observable<Product[]> {
    return this._http
      .get(PRODUCT_URL + "/findByPriceRangeInCategory?cid=" + cid + "&min=" + min + "&max=" + max)
      .map(res => {
        const products = res.json();
        return products
          .map((product) => new Product(product));
      })
      .catch(this.handleError);
  }

  /**
   * Get one product for given product code from loopback api
   */
  findProductByCode(code: string): Observable<Product> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('code', code);

    return this._http
      .get(PRODUCT_URL + "/findByCode", { search: params })
      .map(res => {
        const product = res.json();
        return new Product(product);
      })
      .catch(this.handleError);
  }

  /**
   * Get one product for given product code from loopback api
   */
  findCategoryByProductId(pid: string): Observable<Category> {
    return this._http
      .get(PRODUCT_URL + "/" + pid + "/category")
      .map(res => {
        return new Category(res.json());
      })
      .catch(this.handleError);
  }

  /**
   * Add new product
   * Note: Http post request will be cold if there is not any subcribe() call
   */
  addProduct(product: Product): Observable<Product> {
    return this._http
      .post(PRODUCT_URL, product)
      .map((res) => {
        return new Product(res.json());
      })
      .catch(this.handleError);
  }

  /**
   * Update existing product by a new one -> update product properties
   * Note: Http post request will be cold if there is not any subcribe() call
   */
  updateProduct(product: Product): Observable<Product> {
    return this._http
      .put(PRODUCT_URL + "/" + product.id, product)
      .map((res) => {
        return new Product(res.json());
      })
      .catch(this.handleError);
  }

  /**
     * Get Parent category by parentID
     */
  getParentCategory(pid: number): string {
    return ParentCategory[pid];
  }


  /**
   * Error handling method
   */
  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}
