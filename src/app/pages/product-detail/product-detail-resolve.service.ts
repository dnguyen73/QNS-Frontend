import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { Product } from "../../shared/models/product";
import { Observable } from "rxjs/Observable";
import { ProductService } from "../../shared/services/products.service";

@Injectable()
export class ProductDetailResolve implements Resolve<Product> {

  constructor(private productService: ProductService, private router: Router) { }
    
    resolve(route: ActivatedRouteSnapshot): Observable<Product> {
        let id = route.params['code'];
        return this.productService.findProductByCode(id);
    }

}