import { NgModule } from "@angular/core/";
import { RouterModule ,PreloadAllModules} from "@angular/router";
import { WelcomeComponent } from "./home/welcome.component";
import { PageNotFoundComponent } from "./page-not-found.component";
import { ProductGuard } from "./products/product-guard.service";
import { SelectiveLoading } from "./selectiveloading-statergy.service";

// const Routes = [
//     { path: 'welcome', component: WelcomeComponent },
//     { path: '', redirectTo: 'welcome', pathMatch: 'full' },
//     { path: '**', component: PageNotFoundComponent }
// ]

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'welcome', component: WelcomeComponent },
            // Added for lazy loading , loadChildren is used only fo lazy loading.
            {path :'products' ,loadChildren:'app/products/product.module#ProductModule', canActivate : [ProductGuard] , data:{'preload':false}},
            { path: '', redirectTo: 'welcome', pathMatch: 'full' },
            { path: '**', component: PageNotFoundComponent }
        ],{enableTracing : true , preloadingStrategy : SelectiveLoading}),

        // OR use this
        // RouterModule.forRoot(Routes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
