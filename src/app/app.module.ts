import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

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
import { MessageService } from "./shared/services/message.service";
import { SaleFashionComponent } from './pages/sale-fashion/sale-fashion.component';
import { SaleProductListComponent } from './pages/sale-product-list/sale-product-list.component';
import { ProvinceService } from "./shared/services/province.service";
import { ContactusComponent } from './pages/statics/contactus/contactus.component';
import { AgmCoreModule } from '@agm/core';


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
    SaleProductListComponent,
    ContactusComponent,
    // LadyFashionComponent,
    // SaleFashionComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    BootstrapModalModule,
    HttpModule,
    SharedModule,
    Ng2Webstorage,
    NgxPaginationModule,
    SlickModule.forRoot(),
    StarRatingModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBKanVn1oYARVOn_mMz-2YMGRbokTWVaZ8'
    })
  ],
  entryComponents: [
    ConfirmComponent, AlertComponent
  ],
  providers: [ProductService, ProductDetailResolve, CategoryService, CartService, OrderService, RatingService, ProvinceService, MessageService, UIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
