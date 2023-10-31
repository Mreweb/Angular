import { Injectable, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { Title } from "@angular/platform-browser";
import { TitleStrategy,  RouterStateSnapshot } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
const routes: Routes = [
  { path: "",  title: "ورود به سامانه" , component: LoginComponent },
  { path: "Login",  title: "ورود به سامانه" , component: LoginComponent },
  { path: "Register",  title: "ثبت نام" , component: SignupComponent }, 
];

@Injectable()
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }
  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`${title}`);
    }
  }
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: TitleStrategy, useClass: TemplatePageTitleStrategy }],
})
export class AppRoutingModule { }
