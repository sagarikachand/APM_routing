// This resolver can be used by any component that needs a single product.
// This is a service so we have to register it 
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
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var router_1 = require('@angular/router');
var product_service_1 = require("./product.service");
var ProductResolver = (function () {
    function ProductResolver(router, productService) {
        this.router = router;
        this.productService = productService;
    }
    ProductResolver.prototype.resolve = function (route, state) {
        // 1. Read the id parameter
        var _this = this;
        var id = route.params['id'];
        // 2. One can handle error here so that the component need 
        if (isNaN(id)) {
            // Here it is simple log , this may be elaborate in actual project
            console.log("The product id is not a number  " + id + " ");
            this.router.navigate(['/products']);
            // Since this resolve method returns Observable
            return Observable_1.Observable.of(null);
        }
        // If id is a number fetch the data
        return this.productService.getProduct(+id)
            .map(function (product) {
            if (product) {
                return product;
            }
            console.log("The product was not found " + id);
            _this.router.navigate(['/products']);
            // map returns an Observable so no need to use Observable Of
            return null;
        })
            .catch(function (error) {
            console.log("Error " + error);
            _this.router.navigate(['/products']);
            // map returns an Observable so no need to use Observable Of
            return Observable_1.Observable.of(null);
        });
    };
    ProductResolver = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, product_service_1.ProductService])
    ], ProductResolver);
    return ProductResolver;
}());
exports.ProductResolver = ProductResolver;
//# sourceMappingURL=product-resolver.service.js.map