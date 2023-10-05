/* angular plugin imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  
import { DahsboardModule } from './dashboard/dahsboard.module';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
/* custom module imports */



@NgModule({
  declarations: [],
  imports: [
    CommonModule,  
    DahsboardModule,
    DashboardRoutingModule
  ],
  providers: [],
  exports: [RouterModule]
})
export class FeatureModule { }
