// This resolver can be used by any component that needs a single product.
// This is a service so we have to register it 

import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { IProduct } from "./product";
import { ActivatedRouteSnapshot , RouterStateSnapshot ,Router } from '@angular/router'
import { ProductService } from "./product.service";



@Injectable()
export class ProductResolver implements Resolve<IProduct>{

    constructor(private router : Router,
                private productService: ProductService){
      
    }
    
    
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct> {

        // 1. Read the id parameter

        let id= route.params['id'];

        // 2. One can handle error here so that the component need 

        if(isNaN(id)){
            // Here it is simple log , this may be elaborate in actual project
            console.log(`The product id is not a number  ${id} `)
            this.router.navigate(['/products']);
            // Since this resolve method returns Observable
            return Observable.of(null);
            
        }

        // If id is a number fetch the data
        return this.productService.getProduct(+id)
        .map(
            (product)=>{
                if(product){
                    return product;
                }
                console.log(`The product was not found ${id}`);
                this.router.navigate(['/products']);
                // map returns an Observable so no need to use Observable Of
                return null;
            }
        )
        .catch(
            (error) =>{
                console.log(`Error ${error}`);
                this.router.navigate(['/products']);
                // map returns an Observable so no need to use Observable Of
                return Observable.of(null);
            }
        )


    }

    //  this resolve method can return simply a data, an observable or promise of a data    
    // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IProduct | Observable<IProduct> | Promise<IProduct> {
    //     throw new Error("Method not implemented.");
    // }


}