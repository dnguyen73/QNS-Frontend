import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from "./common/notfound/notfound.component";
import { MainComponent } from "./common/main/main.component";
import { HomeComponent } from "./pages/home/home.component";
import { HeaderComponent } from "./common/header/header.component";
import { FooterComponent } from "./common/footer/footer.component";
import { NewArrivalComponent } from "./pages/new-arrival/new-arrival.component";
import { ProductListComponent } from "./pages/product-list/product-list.component";
import { ProductDetailResolve } from "./pages/product-detail/product-detail-resolve.service";
import { ProductDetailComponent } from "./pages/product-detail/product-detail.component";
import { ShoppingCartComponent } from "./pages/shopping-cart/shopping-cart.component";
import { ConfirmComponent } from "./common/dialog/confirm.component";
import { AlertComponent } from "./common/dialog/alert.component";
import { ThankyouComponent } from "./pages/thankyou/thankyou.component";

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            { path: '', redirectTo: '/home', pathMatch: 'full' },
            {
                path: 'home',
                component: HomeComponent,
                // children: [
                //     { path: '', component: NewContentComponent}
                // ]
            },
            {
                path: 'new',
                component: NewArrivalComponent,
                children: [
                    { path: ':id', component: ProductListComponent }
                ]
            },
            {
                path: 'product/:code',
                component: ProductDetailComponent,
                resolve: {
                    product: ProductDetailResolve
                },
            },
            {
                path: 'cart',
                component: ShoppingCartComponent
            },
            {
                path: 'thankyou/:code',
                component: ThankyouComponent
            }
            //{ path: 'new/:id', component: ProductListComponent },

        ]
    },
    { path: '**', component: NotfoundComponent },

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: false })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
export const routedComponents: any[] = [
    MainComponent,
    HomeComponent,
    HeaderComponent, FooterComponent, NotfoundComponent, NewArrivalComponent, ProductListComponent, ProductDetailComponent,
    ShoppingCartComponent, ThankyouComponent,
    ConfirmComponent, AlertComponent
]
