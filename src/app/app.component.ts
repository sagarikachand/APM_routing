import { Component } from '@angular/core';
import { Router ,Event , NavigationStart , NavigationError , NavigationCancel , NavigationEnd} from '@angular/router'
import { AuthService } from './user/auth.service';
import { MessageService } from './messages/message.service';

@Component({
    selector: 'pm-app',
    templateUrl: './app/app.component.html'
})
export class AppComponent {
    pageTitle: string = 'Acme Product Management';
    isLoading:boolean =false;

    constructor(private authService: AuthService,
                private mesgService : MessageService,
                private router :Router) {
            this.router.events.subscribe(
                (routerEvent:Event)=>{
                    this.checkRouting(routerEvent);
                }
            )
                 }

        
    logOut(): void {
        this.authService.logout();
        this.router.navigateByUrl('/welcome')
        console.log('Log out');
    }
    showMessages():void{
      this.router.navigate( [{ outlets: { popup :['messages']}}] ) ;
      this.mesgService.isDisplayed=true;
    }
    hideMessages():void{
        this.router.navigate([ { outlets : {popup : null  }}])
        this.mesgService.isDisplayed=false;
    }
    checkRouting(routerEvent:Event){
      if(routerEvent instanceof NavigationStart){
          this.isLoading=true;
      } 
      if(routerEvent instanceof NavigationError  ||
         routerEvent instanceof NavigationEnd ||
         routerEvent instanceof NavigationCancel ){
             this.isLoading=false;
         }

         

    }
}
