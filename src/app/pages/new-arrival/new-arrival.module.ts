import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NewArrivalComponent } from "./new-arrival.component";
import { ProductService } from "../../shared/services/products.service";
import { ProductListComponent } from "../product-list/product-list.component";
//import { MomentModule } from 'angular2-moment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // RouterModule.forChild([
    //   //{ path: 'new', component: NewArrivalComponent },
    //   { path: '/:id', component: ProductListComponent },
    // ])
  ],
  providers: [ProductService],
  declarations: [NewArrivalComponent]
})
export class NewArrivalModule { }
