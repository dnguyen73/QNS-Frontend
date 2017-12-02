import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from "./common/notfound/notfound.component";
import { MainComponent } from "./common/main/main.component";
import { HomeComponent } from "./pages/home/home.component";
import { HeaderComponent } from "./common/header/header.component";
import { FooterComponent } from "./common/footer/footer.component";
import { NewArrivalComponent } from "./pages/new-arrival/new-arrival.component";
import { ProductDetailResolve } from "./pages/product-detail/product-detail-resolve.service";
import { ProductDetailComponent } from "./pages/product-detail/product-detail.component";
import { ShoppingCartComponent } from "./pages/shopping-cart/shopping-cart.component";
import { ConfirmComponent } from "./common/dialog/confirm.component";
import { AlertComponent } from "./common/dialog/alert.component";
import { ThankyouComponent } from "./pages/thankyou/thankyou.component";
import { FemaleFashionComponent } from "./pages/female-fashion/female-fashion.component";
import { KidsFashionComponent } from "./pages/kids-fashion/kids-fashion.component";
import { LadyFashionComponent } from "./pages/lady-fashion/lady-fashion.component";
import { SaleFashionComponent } from "./pages/sale-fashion/sale-fashion.component";
import { NewProductListComponent } from "./pages/new-product-list/new-product-list.component";
import { SaleProductListComponent } from "./pages/sale-product-list/sale-product-list.component";
import { ContactusComponent } from "./pages/statics/contactus/contactus.component";
import { QnaComponent } from "./pages/statics/qna/qna.component";
import { KidsProductListComponent } from "./pages/kids-product-list/kids-product-list.component";
import { FemaleProductListComponent } from "./pages/female-product-list/female-product-list.component";
import { LadyProductListComponent } from "./pages/lady-product-list/lady-product-list.component";

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            { path: '', redirectTo: '/home', pathMatch: 'full' },
            {
                path: 'home',
                component: HomeComponent,
            },
            {
                path: 'contactus',
                component: ContactusComponent,
            },
            {
                path: 'qna',
                component: QnaComponent,
            },
            {
                path: 'new',
                component: NewArrivalComponent,
                children: [
                    { path: '', component: NewProductListComponent },
                    {
                        path: ':pid',
                        component: NewProductListComponent
                    }
                ]
            },
            {
                path: 'sales',
                component: SaleFashionComponent,
                children: [
                    { path: '', component: SaleProductListComponent },
                    {
                        path: ':pid',
                        component: SaleProductListComponent
                    }
                ]
            },
            {
                path: 'female',
                component: FemaleFashionComponent,
                children: [
                    { path: '', component: FemaleProductListComponent },
                    {
                        path: ':fid',
                        component: FemaleProductListComponent
                    }
                ]
            },
            {
                path: 'lady',
                component: LadyFashionComponent,
                children: [
                    { path: '', component: LadyProductListComponent },
                    {
                        path: ':lid',
                        component: LadyProductListComponent
                    }
                ]
            },
            {
                path: 'kids',
                component: KidsFashionComponent,
                children: [
                    { path: '', component: KidsProductListComponent },
                    {
                        path: ':kid',
                        component: KidsProductListComponent
                    }
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
    HeaderComponent, FooterComponent, NotfoundComponent, NewArrivalComponent, ProductDetailComponent,
    ShoppingCartComponent, ThankyouComponent, FemaleFashionComponent, LadyFashionComponent, KidsFashionComponent, SaleFashionComponent,
    NewProductListComponent, FemaleProductListComponent, KidsProductListComponent, LadyProductListComponent,
    ConfirmComponent, AlertComponent, QnaComponent
]
