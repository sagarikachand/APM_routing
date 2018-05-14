import { Component ,OnInit} from '@angular/core';

import { MessageService } from '../messages/message.service';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { ActivatedRoute ,Router } from '@angular/router';



@Component({
    templateUrl: './app/products/product-edit.component.html',
    styleUrls: ['./app/products/product-edit.component.css']
})
export class ProductEditComponent implements OnInit{
    pageTitle: string = 'Product Edit';
    errorMessage: string;

    // product: IProduct;
    //Adding this to use for candeacvtivate 
    private currentProduct: IProduct;  
    private originalProduct:IProduct;
    dataIsValid: {[key:string]: boolean} ={};

    constructor(private productService: ProductService,
                private messageService: MessageService,
                private route:ActivatedRoute,
                private router :Router) { }

   get product() {
       return this.currentProduct;
   }

    // This will run for the first time when product  is fetched
   set product(value:IProduct){
    //    The currrentProduct is shared by edit info and edit tag forms.So changes by user will reflect in currentProduct
       this.currentProduct=value;
       // Make a clone
       this.originalProduct = Object.assign({},value)
   }

  get isDirty():boolean{
       //For this example this is Ok. But one should go through each property and check for a change.This will be used in Candeactivate guard.
       return JSON.stringify(this.originalProduct) !== JSON.stringify(this.currentProduct)
   }
    ngOnInit(){
        // casting to number by adding +
        // If only parameter of a url change, the component is not re initialised
    //   let id=  +this.route.snapshot.params['id'];
    //   this.route.params.subscribe(
    //       (params)=>{
    //           let id= params['id'];
    //           this.getProduct(id);
    //       }
    //   )
      this.route.data.subscribe(
        (data)=>{
             
            this.onProductRetrieved(data['product'])
        }
        )
    }
    getProduct(id: number): void {
        this.productService.getProduct(id)
            .subscribe(
                (product: IProduct) => this.onProductRetrieved(product),
                (error: any) => this.errorMessage = <any>error
            );
    }

    onProductRetrieved(product: IProduct): void {
        this.product = product;

        if (this.product.id === 0) {
            this.pageTitle = 'Add Product';
        } else {
            this.pageTitle = `Edit Product: ${this.product.productName}`;
        }
    }

    deleteProduct(): void {
        if (this.product.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
       } else {
            if (confirm(`Really delete the product: ${this.product.productName}?`)) {
                this.productService.deleteProduct(this.product.id)
                    .subscribe(
                        () => this.onSaveComplete(`${this.product.productName} was deleted`),
                        (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    saveProduct(): void {
        if (this.isValid(null)) {
            this.productService.saveProduct(this.product)
                .subscribe(
                    () => this.onSaveComplete(`${this.product.productName} was saved`),
                    (error: any) => this.errorMessage = <any>error
                );
        } else {
            this.errorMessage = 'Please correct the validation errors.';
        }
    }

    onSaveComplete(message?: string): void {
        if (message) {
            this.messageService.addMessage(message);
        }
          this.reset();
        // Navigate back to the product list
        this.router.navigate(['/products'])
    }
     
    reset(){
        this.currentProduct=null;
        this.originalProduct=null;
        this.dataIsValid=null;
    }
    isValid(path:string){
        this.validateData();
        if(path){
            return this.dataIsValid[path];
        }

        return (this.dataIsValid && 
                Object.keys(this.dataIsValid).every(d => this.dataIsValid[d]=== true ) );
    }

    validateData(){
        this.dataIsValid ={}

        if(this.product.productName &&
           this.product.productName.length >=3 &&
           this.product.productCode){
               this.dataIsValid['info'] =true
           }else{
               this.dataIsValid['info'] = false;
           }
        
        if(this.product.category &&
           this.product.category.length>=3){
            this.dataIsValid['tags'] =true
           }
           else{
            this.dataIsValid['tags'] = false;
        }
    }
}



// OPTIONAL PARAMETER:
//  optional parameter are specified as an object
// [routerLink] =" ['/products', id , {name:productName , cost : price , startDate: productdate} ] "
// Optional parameter should come after required parameter. These parameters are read same as required parameter using activatedRoute snapshot or abservable
// The key is specific to the url so there is no name collision with any other url.

// For query param see product details component

// [queryParams]="{ key : value1 , key2 : value2 }"  Use this while passing query params to another route url with router link
//  this.router.navigate(['/products' , { queryParams : { filterBy : listFilter , name: ProductName } }  ])
// To send the query param back to the previos route use [preserveQueryParams]= "true " for version less than V4 
// <a [routerLink]= "['/products']"  queryparamsHandling = 'preserve'>BACK</a>
// this.router.navigate(['/products'] , {queryparamsHandling : 'preserve' })

// NAME collision can occur in queryparams
// Query params are always string