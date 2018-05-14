import { Injectable } from "@angular/core";
import { CanDeactivate ,ActivatedRouteSnapshot ,RouterStateSnapshot } from "@angular/router/";
import { ProductEditComponent } from "./product-edit.component";





@Injectable()
export class ProductEditGuard implements CanDeactivate<ProductEditComponent>{

    canDeactivate(component: ProductEditComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
       if(component.isDirty){
           let name= component.product.productName ||'New Product' 
           return confirm(`Navigate away and loose changes to ${name}`)
       }
       return true
    }
    
}