import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

import { HttpRestService } from './services/http-rest/http-rest.service';
import { ApiUrlSetting } from './providers/api-url-setting.service';
import { ModuleWithProviders } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_CONFIG, APP_DI_CONFIG } from './config/app.config';


import { BrowserStorageService } from '@app/core/services/storage/browser-storage.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginGuardService } from '@app/core/services/login-guard/login-guard.service';
import { CacheService } from '@app/core/services/enum/cache.service';
import { PersianCalendarService } from './services/calendar/persian.calendar.service'; 
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  declarations: [],
  providers: [
    /* DONT ADD HERE */
  ],
  exports: []
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: APP_CONFIG,
          useValue: APP_DI_CONFIG
        },
        ApiUrlSetting,
        BrowserStorageService,
        PersianCalendarService,
        HttpRestService,
        CacheService,
        LoginGuardService
      ]
    };
  }
}
