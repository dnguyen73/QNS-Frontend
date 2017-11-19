import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from "../../shared/services/products.service";
import { ProductListComponent } from "../product-list/product-list.component";
import { CategoryService } from "../../shared/services/category.service";
import { SaleFashionComponent } from "./sale-fashion.component";
//import { MomentModule } from 'angular2-moment';
declare var $: any;

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [ProductService, CategoryService],
  declarations: [SaleFashionComponent]
})
export class SaleFahionModule { 
  ngAfterViewInit(){
    $('.zoomContainer').remove();
  }
}
