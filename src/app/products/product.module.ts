import { NgModule } from '@angular/core';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit.component';
import { RouterModule } from '@angular/router'
import { ProductFilterPipe } from './product-filter.pipe';
import { ProductService } from './product.service';

import { SharedModule } from '../shared/shared.module';
import { ProductResolver } from './product-resolver.service';
import { ProductEditInfoComponent } from './product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit-tags.component';
import { ProductGuard } from './product-guard.service';
import { ProductEditGuard } from './product-edit.guard.service';

// The resolve route parameter is an object of one or multiple key value pair, where key holds the data returned from the resolver and the value 
// is the resolver class. The key neeed not be unique across routes. As seen in products/:id and products/:id/edit
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(
      [
        // {    // Commented to delete parent as it is defined in app module for lay loading
        //   path: 'products',
        //    canActivate:[ProductGuard],
        //   children: [
            {
              path: '',
              component: ProductListComponent,
             
            },
            {
              path: ':id',
              component: ProductDetailComponent,
              resolve: { product: ProductResolver }
            },
            {
              path: ':id/edit',
              component: ProductEditComponent,
              resolve: { product: ProductResolver },
              canDeactivate:[ ProductEditGuard],
              children: [

                { path: '', redirectTo: 'info', pathMatch: 'full' },
                { path: 'info', component: ProductEditInfoComponent },
                { path: 'tags', component: ProductEditTagsComponent }
              ]
            }
          // ]
        // }

      ]
    )
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductFilterPipe,
    ProductEditInfoComponent,
    ProductEditTagsComponent
  ],
  providers: [
    ProductService,
    ProductResolver,
    ProductEditGuard
  ]
})
export class ProductModule { }

