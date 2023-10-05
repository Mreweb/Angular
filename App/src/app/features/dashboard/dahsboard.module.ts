import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './dashboard-components/home/home.component';
import { OutletComponent } from './dashboard-components/outlet/outlet.component';
import { LayoutComponent } from 'src/app/layout/layout/layout.component';
import { ProfileComponent } from './dashboard-components/profile/profile.component';



@NgModule({
  declarations: [
    OutletComponent,
    LayoutComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  providers: [
  ]
})
export class DahsboardModule { }
