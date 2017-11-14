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
import { CategoryService } from "./shared/services/category.service";
import { FemaleFashionComponent } from './pages/female-fashion/female-fashion.component';
import { KidsFashionComponent } from './pages/kids-fashion/kids-fashion.component';
import { HomeNewComponent } from './pages/home-new/home-new.component';
import { ProductBoxComponent } from './components/product-box/product-box.component';
import { HomeKidsComponent } from './pages/home-kids/home-kids.component';
import { SlickSliderComponent } from './common/slick-slider/slick-slider.component';
import { SlickModule } from 'ngx-slick';
import { StarRatingModule } from 'angular-star-rating';
import { LadyFashionComponent } from './pages/lady-fashion/lady-fashion.component';
import { UIService } from "./shared/services/ui.service";
import { RatingService } from "./shared/services/rating.service";


@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    QnsPricePipe,
    FemaleFashionComponent,
    KidsFashionComponent,
    HomeNewComponent,
    ProductBoxComponent,
    HomeKidsComponent,
    SlickSliderComponent,
    LadyFashionComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    BootstrapModalModule,
    HttpModule,
    SharedModule,
    Ng2Webstorage,
    SlickModule.forRoot(),
    StarRatingModule.forRoot()
  ],
  entryComponents: [
    ConfirmComponent, AlertComponent
  ],
  providers: [ProductService, ProductDetailResolve, CategoryService, CartService, OrderService, RatingService, UIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
