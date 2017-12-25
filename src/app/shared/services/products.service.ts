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
  getAllSaleProducts(pagenum: number): Observable<Product[]> {
    if (!pagenum) { pagenum = 1 };
    
    return this._http
      .get(PRODUCT_URL + "/findAllSale?pagenum=" + pagenum)
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
  getAllNewProducts(pagenum: number): Observable<Product[]> {
    if (!pagenum) { pagenum = 1 };

    return this._http
      .get(PRODUCT_URL + "/findAllNewest?pagenum=" + pagenum)
      .map(res => {
        const product = res.json();
        return product.map((product) => new Product(product));
      })
      .catch(this.handleError);
  }

  /**
   * Grab all product items for given parentId from loopback api
   */
  getProductsByParentId(pId: number, pagenum?: number): Observable<Product[]> {
    let reqURL: string = '';

    if (!pagenum) { pagenum = 1 };
    reqURL = PRODUCT_URL + "/findByParentId?parentId=" + pId + "&pagenum=" + pagenum;

    return this._http
      .get(reqURL)
      .map(res => {
        const products = res.json();
        return products.map((p) => new Product(p));
      })
      .catch(this.handleError);
  }

  /**
   * Get number count of products belong to selected category
   */
  getCountByCategoryId(cId: string): Observable<number> {
    let reqURL: string = '';

    reqURL = PRODUCT_URL + "/countByCategory?categoryId=" + cId;

    return this._http
      .get(reqURL)
      .map(res => {
        const data = res.json();
        return data.count;
      })
      .catch(this.handleError);
  }

  /**
     * Get number count of newest products belong to all parent category
     */
  getCountAllNewest(): Observable<number> {
    let reqURL: string = '';

    reqURL = PRODUCT_URL + "/countAllNewest";

    return this._http
      .get(reqURL)
      .map(res => {
        const data = res.json();
        return data.count;
      })
      .catch(this.handleError);
  }

  /**
     * Get number count of sale products belong to all parent category
     */
  getCountAllSale(): Observable<number> {
    let reqURL: string = '';

    reqURL = PRODUCT_URL + "/countAllSale";

    return this._http
      .get(reqURL)
      .map(res => {
        const data = res.json();
        return data.count;
      })
      .catch(this.handleError);
  }

  /**
   * Get number count of newest products belong to selected parent category
   */
  getCountNewestByParentId(pId: number): Observable<number> {
    let reqURL: string = '';

    reqURL = PRODUCT_URL + "/countNewestByParentId?parentId=" + pId;

    return this._http
      .get(reqURL)
      .map(res => {
        const data = res.json();
        return data.count;
      })
      .catch(this.handleError);
  }

  /**
   * Get number count of newest products belong to selected parent category
   */
  getCountSaleByParentId(pId: number): Observable<number> {
    let reqURL: string = '';

    reqURL = PRODUCT_URL + "/countSaleByParentId?parentId=" + pId;

    return this._http
      .get(reqURL)
      .map(res => {
        const data = res.json();
        return data.count;
      })
      .catch(this.handleError);
  }

  /**
   * Get number count of products belong to selected parent id
   */
  getCountByParentId(pId: number): Observable<number> {
    let reqURL: string = '';

    reqURL = PRODUCT_URL + "/countByParentId?parentId=" + pId;

    return this._http
      .get(reqURL)
      .map(res => {
        const data = res.json();
        return data.count;
      })
      .catch(this.handleError);
  }

  /**
   * Grab all product items for given category Id from loopback api
   */
  getProductsByCategoryId(cId: string, pagenum?: number): Observable<Product[]> {
    // let params: URLSearchParams = new URLSearchParams();
    // params.set('categoryId', cId);
    // params.set('top', top.toString());
    let reqURL: string = '';

    if (!pagenum) { pagenum = 1 };
    reqURL = PRODUCT_URL + "/findByCategory?categoryId=" + cId + "&pagenum=" + pagenum;

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
  fetchNewProductsByParentId(parentId: number, pagenum?: number): Observable<Product[]> {
    let reqURL: string = '';
    if (!pagenum) { pagenum = 1 };

    reqURL = PRODUCT_URL + "/findNewestByParentId?pid=" + parentId + "&pagenum=" + pagenum;

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
  fetchSaleProductsByParentId(parentId: number, pagenum?: number): Observable<Product[]> {
    let url: string = '';
    if (!pagenum) { pagenum = 1 };

    url = PRODUCT_URL + "/findSaleByParentId?pid=" + parentId + "&pagenum=" + pagenum;
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
