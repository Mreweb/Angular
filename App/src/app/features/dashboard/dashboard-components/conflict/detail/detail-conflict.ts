import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '@app/services/ui/cutsomer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserStorageService } from '@app/core/services/storage/browser-storage.service';
import { PersianCalendarService } from '@app/core/services/calendar/persian.calendar.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, APP_DI_CONFIG, AppConfig } from '@app/core/config/app.config';
@Component({
  selector: 'app-home',
  templateUrl: './detail-conflict.html',
  styleUrls: ['./detail-conflict.css']
})
export class ConflictDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private CustomerService: CustomerService,
    private storage: BrowserStorageService,
    private toastr: ToastrService) { }

  @BlockUI() blockUI: NgBlockUI;

  
  ngOnInit(): void {
    
  }

}