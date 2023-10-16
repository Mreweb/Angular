import { Injectable } from '@angular/core';
import { HttpRestService } from '@app/core/services/http-rest/http-rest.service';
import { AdapterService } from '@app/core/services/adapter/adapter.service';
@Injectable()
export class InitialDataService extends AdapterService<any> {

  constructor(protected override rest: HttpRestService) {
    super(rest, 'Initial');
   }

}