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
var router_1 = require('@angular/router');
var auth_service_1 = require('./user/auth.service');
var message_service_1 = require('./messages/message.service');
var AppComponent = (function () {
    function AppComponent(authService, mesgService, router) {
        var _this = this;
        this.authService = authService;
        this.mesgService = mesgService;
        this.router = router;
        this.pageTitle = 'Acme Product Management';
        this.isLoading = false;
        this.router.events.subscribe(function (routerEvent) {
            _this.checkRouting(routerEvent);
        });
    }
    AppComponent.prototype.logOut = function () {
        this.authService.logout();
        this.router.navigateByUrl('/welcome');
        console.log('Log out');
    };
    AppComponent.prototype.showMessages = function () {
        this.router.navigate([{ outlets: { popup: ['messages'] } }]);
        this.mesgService.isDisplayed = true;
    };
    AppComponent.prototype.hideMessages = function () {
        this.router.navigate([{ outlets: { popup: null } }]);
        this.mesgService.isDisplayed = false;
    };
    AppComponent.prototype.checkRouting = function (routerEvent) {
        if (routerEvent instanceof router_1.NavigationStart) {
            this.isLoading = true;
        }
        if (routerEvent instanceof router_1.NavigationError ||
            routerEvent instanceof router_1.NavigationEnd ||
            routerEvent instanceof router_1.NavigationCancel) {
            this.isLoading = false;
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'pm-app',
            templateUrl: './app/app.component.html'
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, message_service_1.MessageService, router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map