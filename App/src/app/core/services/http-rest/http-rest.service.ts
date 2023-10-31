import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, pipe, of, from, interval, merge, fromEvent } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

/*
// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter'; 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
*/

import { ApiUrlSetting } from '../../providers/api-url-setting.service';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { AppConfig, APP_DI_CONFIG } from '@app/core/config/app.config';

import { BrowserStorageService } from '@app/core/services/storage/browser-storage.service';
import { Router } from '@angular/router';

// Http Rest Service
// RESTFUL WEBSERVICE FOR ANGULAR2 USING OBSERVABLE
@Injectable()
export class HttpRestService {

  controller: string;
  customApiUrl: string; 
  cookie: any;


  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private apiUrlSetting: ApiUrlSetting,
    private storage: BrowserStorageService) {
      this.controller = "";
      this.customApiUrl = "";  
    }

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
        return obj.access_token;
      }
    }
    return "";
  }
  getSSOTokenCookie(cname:any) {
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
        return obj;
      }
    }
    return "";
  }

  setController(controller: string) {
    this.controller = controller;
  }

  getService(param: any | null, dataHeader: any[] | null = null, activeArrayBuffer = false): Observable<any> {
    let params: HttpParams = new HttpParams();
    if (activeArrayBuffer) {
      params.set("responseType" , "arraybuffer");
    }
    if (param !== null) {
      for (const key in param) {
        if (param.hasOwnProperty(key)) {
          const val = param[key];
          params = params.append(key, val);
        }
      }
    }
    let opt: any = {};
    if (dataHeader) {
      let header = this.getHeader(dataHeader);
      opt = { params: params, headers: header };
    }
    else {
      let headers = new HttpHeaders({  'Content-Type': 'application/json' }); 
      opt = { params: params, headers: headers, withCredentials: true , credentials: "include"  };
    }
    return this.httpClient.get(this.apiUrlSetting.getQueryApiUrl(this.controller), opt  )
  }
  createService(body: any, header: any = null): Observable<any> {
    if (header === null) {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.httpClient.post(this.apiUrlSetting.getQueryApiUrl(this.controller), body)
    }
    return this.httpClient.post(this.apiUrlSetting.getQueryApiUrl(this.controller), body, header)
  }
  createServiceWithParams(params: HttpParams): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let apiUrl = this.apiUrlSetting.getQueryApiUrl(this.controller) + "?";
    let paramCopy: any;
    paramCopy = params;
    if (paramCopy.updates != null) {
      for (var i = 0; i < paramCopy.updates.length; i++) {
        apiUrl += paramCopy.updates[i].param + "=" + paramCopy.updates[i].value + "&";
      }
    }
    return this.httpClient.post(apiUrl, null, { headers: headers });
  }
  updateService(body: any, header: any = null): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(this.apiUrlSetting.getQueryApiUrl(this.controller), body, { headers: headers })
  }
  updateServiceWithParams(params: HttpParams): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let apiUrl = this.apiUrlSetting.getQueryApiUrl(this.controller) + "?";
    let paramCopy: any;
    paramCopy = params;
    if (paramCopy.updates != null) {
      for (var i = 0; i < paramCopy.updates.length; i++) {
        apiUrl += paramCopy.updates[i].param + "=" + paramCopy.updates[i].value + "&";
      }
    }
    return this.httpClient.put(apiUrl, null, { headers: headers })
  }
  patchService(url: string, body: any): Observable<any> {
    return this.httpClient
      .patch(this.apiUrlSetting.getQueryApiUrl(this.controller), body)
  }
  deleteService(id: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.delete(this.apiUrlSetting.getQueryApiUrl(this.controller) + '/' + id, { headers: headers })
  }
  deleteWhitService(param: any | null): Observable<any> {
    let params: HttpParams = new HttpParams();
    if (param !== null) {
      for (const key in param) {
        if (param.hasOwnProperty(key)) {
          const val = param[key];
          params = params.append(key, val);
        }
      }
    }
    return this.httpClient.delete(this.apiUrlSetting.getQueryApiUrl(this.controller), { params: params })
  }
  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'ارتباط با سرور با مشکل مواجه شده است';
      console.log("eRRRRRRRRROR");
      this.toastr.error('در ثبت نام', errMsg);
      //return Observable.throw(errMsg);
  }
  private getHeader(data: any): HttpHeaders {
    let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers = headers.append('filter', JSON.stringify(data));
    return headers;
  }
}

