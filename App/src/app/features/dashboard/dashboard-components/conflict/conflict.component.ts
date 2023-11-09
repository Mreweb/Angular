import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '@app/services/ui/cutsomer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserStorageService } from '@app/core/services/storage/browser-storage.service';
import { PersianCalendarService } from '@app/core/services/calendar/persian.calendar.service';

@Component({
  selector: 'app-home',
  templateUrl: './conflict.html',
  styleUrls: ['./conflict.css']
})
export class ConflictListComponent implements OnInit, AfterViewInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private CustomerService: CustomerService,
    private persianCalendarService: PersianCalendarService,
    private storage: BrowserStorageService,
    private toastr: ToastrService) { }

  @BlockUI() blockUI: NgBlockUI;
  captchaSrc = "";
  pageNumber: any = 1;
  pageSize: any = 10;
  total: any;
  loading: boolean;
  config: any;
  ConflictList: any = [];
  dataLoaded: boolean = false;


  pageForm = new FormGroup({
    Page: new FormControl('', [Validators.required]),
    PageSize: new FormControl('', [Validators.required]),
    Title: new FormControl('', [Validators.required]),
    From: new FormControl('', [Validators.required]),
    To: new FormControl('', [Validators.required])
  });


  ngAfterViewInit() {

  }

  ngOnInit(): void {
    this.getConflictList();
  }
  getConflictList() {
    this.dataLoaded = false;
    this.pageForm.controls['Page'].setValue(this.pageNumber);
    this.pageForm.controls['PageSize'].setValue(this.pageSize);
    let FromDate: any = "";
    let ToDate: any = "";
    if (this.pageForm.controls['From'].value != '') {
      FromDate = (this.persianCalendarService.GeorgianCalendar(this.pageForm.controls['From'].value));
    }
    if (this.pageForm.controls['To'].value != '') {
      ToDate = (this.persianCalendarService.GeorgianCalendar(this.pageForm.controls['To'].value));
    }
    console.log(this.pageForm.value);

    this.CustomerService.get({
      'page': this.pageForm.controls['Page'].value,
      'pageSize': this.pageForm.controls['PageSize'].value,
      'from': FromDate,
      'to': ToDate,
    }, null, "discrepancies").subscribe({
      next: (data: any) => {
        this.ConflictList = data.content.items;
        this.total = data.content.count;
        for (let i = 0; i < this.ConflictList.length; i++) {
          this.ConflictList[i].creationDate = this.persianCalendarService.PersianCalendar(this.ConflictList[i]?.creationDate);
        }
        this.dataLoaded = true;
      },
      error: () => { }
    });
  }

  conflictDetail(id: any) {
    this.router.navigateByUrl('Dashboard/');
  }


}
