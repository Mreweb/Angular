import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
// hardcoded user data.
const loggedInUser = {
 id: '1zx-casd123-asdzxc132',
 name: 'Mohammadreza Esmaeeli',
 role: 'customer'
}
@Injectable({
 providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 // inject the router service to allow navigation.
 constructor(private router: Router) { }
 canActivate(  route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   const { role } = loggedInUser;
   // provides the route configuration options.
   const { routeConfig } = route; 
   // provides the path of the route.
   const { path } = routeConfig as Route; 
   /*if (path?.includes('Dashobard') && role === 'Dashobard') {
     return true;
   }*/
   /*if ((path?.includes('guest') || path?.includes('home')) && (role === 'customer' || role === 'administrator')) {
       this.router.navigateByUrl(role === 'customer' ? '/customer' : '/admin');
       return false;
   }*/
   // for any other condition, navigate to the forbidden route.

   if(localStorage.getItem("userInfo") == undefined){
    this.router.navigateByUrl('/Forbidden'); 
    return false;
   } else{
    return false;
   }


 }
}