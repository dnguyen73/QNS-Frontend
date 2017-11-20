import { NgModule, } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';


const ANGULAR_MODULES: any[] = [
  FormsModule, ReactiveFormsModule,
];

const APP_MODULES: any[] = [
]

@NgModule({
  imports: [
    CommonModule,
    ANGULAR_MODULES,
    APP_MODULES
  ],
  declarations: [

  ],
  exports: [
    ANGULAR_MODULES,
    APP_MODULES
  ]
})
export class SharedModule { }
