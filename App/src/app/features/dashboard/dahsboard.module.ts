import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './dashboard-components/home/home.component';
import { OutletComponent } from './dashboard-components/outlet/outlet.component';
import { LayoutComponent } from 'src/app/layout/layout/layout.component';
import { ProfileComponent } from './dashboard-components/profile/profile.component';
import { ConflictListComponent } from './dashboard-components/conflict/conflict.component';
import { ConflictAddComponent } from './dashboard-components/conflict/add/add-conflict';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    OutletComponent,
    LayoutComponent,
    HomeComponent,
    ProfileComponent,

    ConflictListComponent,
    ConflictAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxSkeletonLoaderModule.forRoot({ animation: 'pulse', loadingText: 'This item is actually loading...' }) ,
    DashboardRoutingModule
  ],
  providers: [
  ]
})
export class DahsboardModule { }
