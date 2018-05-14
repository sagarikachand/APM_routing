"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var message_service_1 = require('../messages/message.service');
var product_service_1 = require('./product.service');
var router_1 = require('@angular/router');
var ProductEditComponent = (function () {
    function ProductEditComponent(productService, messageService, route, router) {
        this.productService = productService;
        this.messageService = messageService;
        this.route = route;
        this.router = router;
        this.pageTitle = 'Product Edit';
        this.dataIsValid = {};
    }
    Object.defineProperty(ProductEditComponent.prototype, "product", {
        get: function () {
            return this.currentProduct;
        },
        // This will run for the first time when product  is fetched
        set: function (value) {
            //    The currrentProduct is shared by edit info and edit tag forms.So changes by user will reflect in currentProduct
            this.currentProduct = value;
            // Make a clone
            this.originalProduct = Object.assign({}, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductEditComponent.prototype, "isDirty", {
        get: function () {
            //For this example this is Ok. But one should go through each property and check for a change.This will be used in Candeactivate guard.
            return JSON.stringify(this.originalProduct) !== JSON.stringify(this.currentProduct);
        },
        enumerable: true,
        configurable: true
    });
    ProductEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        // casting to number by adding +
        // If only parameter of a url change, the component is not re initialised
        //   let id=  +this.route.snapshot.params['id'];
        //   this.route.params.subscribe(
        //       (params)=>{
        //           let id= params['id'];
        //           this.getProduct(id);
        //       }
        //   )
        this.route.data.subscribe(function (data) {
            _this.onProductRetrieved(data['product']);
        });
    };
    ProductEditComponent.prototype.getProduct = function (id) {
        var _this = this;
        this.productService.getProduct(id)
            .subscribe(function (product) { return _this.onProductRetrieved(product); }, function (error) { return _this.errorMessage = error; });
    };
    ProductEditComponent.prototype.onProductRetrieved = function (product) {
        this.product = product;
        if (this.product.id === 0) {
            this.pageTitle = 'Add Product';
        }
        else {
            this.pageTitle = "Edit Product: " + this.product.productName;
        }
    };
    ProductEditComponent.prototype.deleteProduct = function () {
        var _this = this;
        if (this.product.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        }
        else {
            if (confirm("Really delete the product: " + this.product.productName + "?")) {
                this.productService.deleteProduct(this.product.id)
                    .subscribe(function () { return _this.onSaveComplete(_this.product.productName + " was deleted"); }, function (error) { return _this.errorMessage = error; });
            }
        }
    };
    ProductEditComponent.prototype.saveProduct = function () {
        var _this = this;
        if (this.isValid(null)) {
            this.productService.saveProduct(this.product)
                .subscribe(function () { return _this.onSaveComplete(_this.product.productName + " was saved"); }, function (error) { return _this.errorMessage = error; });
        }
        else {
            this.errorMessage = 'Please correct the validation errors.';
        }
    };
    ProductEditComponent.prototype.onSaveComplete = function (message) {
        if (message) {
            this.messageService.addMessage(message);
        }
        this.reset();
        // Navigate back to the product list
        this.router.navigate(['/products']);
    };
    ProductEditComponent.prototype.reset = function () {
        this.currentProduct = null;
        this.originalProduct = null;
        this.dataIsValid = null;
    };
    ProductEditComponent.prototype.isValid = function (path) {
        var _this = this;
        this.validateData();
        if (path) {
            return this.dataIsValid[path];
        }
        return (this.dataIsValid &&
            Object.keys(this.dataIsValid).every(function (d) { return _this.dataIsValid[d] === true; }));
    };
    ProductEditComponent.prototype.validateData = function () {
        this.dataIsValid = {};
        if (this.product.productName &&
            this.product.productName.length >= 3 &&
            this.product.productCode) {
            this.dataIsValid['info'] = true;
        }
        else {
            this.dataIsValid['info'] = false;
        }
        if (this.product.category &&
            this.product.category.length >= 3) {
            this.dataIsValid['tags'] = true;
        }
        else {
            this.dataIsValid['tags'] = false;
        }
    };
    ProductEditComponent = __decorate([
        core_1.Component({
            templateUrl: './app/products/product-edit.component.html',
            styleUrls: ['./app/products/product-edit.component.css']
        }), 
        __metadata('design:paramtypes', [product_service_1.ProductService, message_service_1.MessageService, router_1.ActivatedRoute, router_1.Router])
    ], ProductEditComponent);
    return ProductEditComponent;
}());
exports.ProductEditComponent = ProductEditComponent;
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
//# sourceMappingURL=product-edit.component.js.map