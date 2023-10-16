import { HttpRestService } from '../http-rest/http-rest.service';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { APP_DI_CONFIG } from '@app/core/config/app.config';
import { HttpParams } from '@angular/common/http';


export abstract class AdapterService<T> {
 
  constructor(protected rest: HttpRestService, protected controller: string,
    private customApiUrl: string = '', private activeArrayBuffer = false) { 
  }

  get(params: any | null, dataHeader:any[]|null=null , lastPart: any=null): Observable<T> {
    this.rest.setController(this.controller+lastPart);
    const obs = this.rest.getService(params,dataHeader,this.activeArrayBuffer);
    return obs;
  }

  post(data: any, header: any = null , lastPart: any=null): Observable<any> {
    this.rest.setController(this.controller+lastPart);
    return this.rest.createService(data, header);
  }

  postWithParams(data: HttpParams , lastPart: any=null): Observable<any> {
    this.rest.setController(this.controller+lastPart);
    return this.rest.createServiceWithParams(data);
  }

  put(data: any , lastPart: any=null): Observable<any> {
    this.rest.setController(this.controller+lastPart);
    return this.rest.updateService(data);
  }
  putWithParams(data: HttpParams , lastPart: any=null): Observable<any> {
    this.rest.setController(this.controller+lastPart);
    return this.rest.updateServiceWithParams(data);
  }

  delete(id: any , lastPart: any=null): Observable<any> {
    this.rest.setController(this.controller+lastPart);
    return this.rest.deleteService(id);
  }

  deleteWith(data: any , lastPart: any=null): Observable<any> {
    this.rest.setController(this.controller+lastPart);
    return this.rest.deleteWhitService(data);
  }

}
