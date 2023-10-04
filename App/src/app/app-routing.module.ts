import { Injectable, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FaqComponentComponent } from './faq.component/faq.component.component';
import { Title } from "@angular/platform-browser";
import { 
  TitleStrategy,
  RouterStateSnapshot,
} from "@angular/router";
const routes: Routes = [
  { path: "Faq",  title: "Faq Title" , component: FaqComponentComponent },
  { path: "Home", title: "Home Title" ,component: AppComponent },
];


@Injectable()
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }
  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`App | ${title}`);
    }
  }
}


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: TitleStrategy, useClass: TemplatePageTitleStrategy }],
})
export class AppRoutingModule { }
