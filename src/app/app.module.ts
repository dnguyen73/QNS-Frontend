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
import { CartService } from "./shared/services/cart.service";
import { QnsPricePipe } from "./shared/pipes/qns-price.pipe";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from "./common/dialog/confirm.component";
import { AlertComponent } from "./common/dialog/alert.component";
import { Ng2Webstorage } from 'ngx-webstorage';
import { OrderService } from "./shared/services/order.service";


@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    QnsPricePipe,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    BootstrapModalModule,
    HttpModule,
    SharedModule,
    Ng2Webstorage,
  ],
  entryComponents: [
    ConfirmComponent, AlertComponent
  ],
  providers: [ProductService, ProductDetailResolve, CartService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
