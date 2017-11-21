import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { environment } from "../../../environments/environment";
import { Province } from "../models/province";
import { Http } from "@angular/http";

const PROVINCE_URL: string = environment.apiUrl + '/provinces';

@Injectable()
export class ProvinceService {

  constructor(private _http: Http) { }

  /**
     * Grab all province items from loopback api
     */
  getAllProvinces(): Observable<Province[]> {
    return this._http
      .get(PROVINCE_URL)
      .map(res => {
        const province = res.json();
        return province.map((r) => new Province(r));
      })
      .catch(this.handleError);
  }

  

  /**
   * Get one province by ID from loopback api
   */
  findProvinceById(id: string): Observable<Province> {
    return this._http
      .get(PROVINCE_URL + "/" + id)
      .map(res => {
        const province = res.json();
        return new Province(province);
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
