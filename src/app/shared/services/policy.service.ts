import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Policy } from "../models/policy";
import { environment } from "../../../environments/environment";

const POLICY_URL: string = environment.apiUrl + '/policies';

@Injectable()
export class PolicyService {

  constructor(private _http: Http) { }

  /**
     * Grab all policy items from loopback api
     */
  getAllPolicies(): Observable<Policy[]> {
    return this._http
      .get(POLICY_URL)
      .map(res => {
        const policy = res.json();
        return policy.map((p) => new Policy(p));
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
