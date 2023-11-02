import { Injectable, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Title } from "@angular/platform-browser";
import { TitleStrategy, RouterStateSnapshot } from "@angular/router";
import { LayoutComponent } from 'src/app/layout/layout/layout.component';
import { OutletComponent } from './dashboard-components/outlet/outlet.component';
import { HomeComponent } from './dashboard-components/home/home.component';
import { ProfileComponent } from './dashboard-components/profile/profile.component';
import { ConflictListComponent } from './dashboard-components/conflict/conflict.component';
import { ConflictAddComponent } from './dashboard-components/conflict/add/add-conflict';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,//   
    data: { title: "پیشخوان" },
    children: [
      {
        path: 'Dashboard',
        component: OutletComponent,//
        children: [
          { path: 'Home', component: HomeComponent, title: "فهرست سازمان" },
          { path: 'Profile', component: ProfileComponent, title: "پروفایل کاربری" },

          { path: 'ConflictList', component: ConflictListComponent, title: "فهرست مغایرت گیری"},
          { path: 'ConflictList/Add', component: ConflictAddComponent, title: "افزودن مغایرت گیری" }

          
        ]
      }
    ]
  }
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{ provide: TitleStrategy, useClass: TemplatePageTitleStrategy }],
})
export class DashboardRoutingModule { }
