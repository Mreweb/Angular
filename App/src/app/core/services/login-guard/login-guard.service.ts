import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { BrowserStorageService } from '@app/core/services/storage/browser-storage.service';
import { Router } from '@angular/router';

@Injectable()
export class LoginGuardService implements CanActivate {
  constructor(
    private router: Router,
    private storage: BrowserStorageService) { }


  getCookie(cname:any) {
    var name = cname + "=",
      ca = document.cookie.split(';'),
      i,
      c,
      ca_length = ca.length;
    for (i = 0; i < ca_length; i += 1) {
      c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) !== -1) {
        var obj = JSON.parse(c.substring(name.length, c.length));
        //return obj.access_token;
        return obj;
      }
    }
    return "";
  }

  canActivate() {
    //return true;
    var value = this.getCookie('clientId');
    if (value) {
      if (value.access_token == null || value.access_token == "") {
        this.router.navigate(['/Login']);
        return false;
      }
      return true;
    }
    else {
      this.router.navigate(['/Login']);
      return false;
    }
    /*var value = document.cookie;
    if (value.search("clientId=") >= 0) {
      const item = JSON.parse(value.replace('clientId=', ''));
      if (item.access_token == null || item.access_token == "") { 
        this.router.navigate(['/Login']);
        return false;
      }
      return true;
    }
    else {
      this.router.navigate(['/Login']);
      return false;
    }*/
  }
}
