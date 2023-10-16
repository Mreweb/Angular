import { Injectable } from '@angular/core';
import { AdapterService } from '@app/core/services/adapter/adapter.service';
import { HttpRestService } from '@app/core/services/http-rest/http-rest.service';

@Injectable()
export class ProductService extends AdapterService<any>{

  constructor(protected override rest: HttpRestService) {
    super(rest, 'hsfind/Fa/v1');
  } 
}
