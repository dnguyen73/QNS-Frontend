import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routedComponents, AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";

//Import RxJs required methods.
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import { ProductService } from "./shared/services/products.service";
import { ProductDetailResolve } from "./pages/product-detail/product-detail-resolve.service";


@NgModule({
  declarations: [
    AppComponent,
    routedComponents
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    SharedModule,
  ],
  providers: [ProductService, ProductDetailResolve],
  bootstrap: [AppComponent]
})
export class AppModule { }