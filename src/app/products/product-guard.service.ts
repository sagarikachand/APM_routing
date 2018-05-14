import { Injectable } from "@angular/core";
import { CanActivate ,ActivatedRouteSnapshot , RouterStateSnapshot ,Router ,Route} from "@angular/router";
import { AuthService } from "../user/auth.service";
import { CanLoad } from "@angular/router/src/interfaces";





@Injectable()
export class ProductGuard implements CanActivate ,CanLoad{
    
     
    constructor( private authService :AuthService,
                private router : Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        // route.
       let url= state.url;
        return this.checkIfLoggedIn(url);
    }
  
    canLoad(route: Route): boolean {
        return this.checkIfLoggedIn(route.path);
    }


    checkIfLoggedIn(url:string){
        if(this.authService.isLoggedIn()){
            return true;
        } 
 
          this.authService.redirecturl=url;
          this.router.navigate(['/login']);
          return false;
        
    }

}