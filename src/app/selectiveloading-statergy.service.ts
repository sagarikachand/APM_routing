import { Injectable } from "@angular/core";
import { PreloadingStrategy ,Route} from "@angular/router";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of'



@Injectable()
export class SelectiveLoading implements PreloadingStrategy{


    preload(route: Route, load: Function): Observable<any> {
     if(route.data && route.data['preload']){
         load();
     }
      return Observable.of(null);

  
    }

}