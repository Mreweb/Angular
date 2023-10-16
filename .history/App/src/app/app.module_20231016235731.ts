import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponentComponent } from './layout/navbar/navbar.component/navbar.component.component';
import { SidebarComponentComponent } from './layout/sidebar/sidebar.component/sidebar.component.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FeatureModule } from './features/feature.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CoreModule } from './core/core.module';
import { BlockUIModule } from 'ng-block-ui';
import { ToastrModule } from 'ngx-toastr'; 
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({ 
  declarations: [
    AppComponent,
    NavbarComponentComponent,
    SidebarComponentComponent,
    LoginComponent,
    SignupComponent
  ],
  exports: [
    LoginComponent,
    NavbarComponentComponent,
    SidebarComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule.forRoot(),  
    BlockUIModule.forRoot({
      message: '...لطفا منتظر بمانید',
      delayStart: 0,
      delayStop: 0
    }),
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),  
    HttpClientModule,
    FeatureModule
  ], 
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
