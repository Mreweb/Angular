import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
export class ConflictListComponent implements OnInit {

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
    From: new FormControl('', [Validators.required]),
    To: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.getConflictList();
  }
  getConflictList() {
    this.dataLoaded = false;
    this.pageForm.controls['Page'].setValue(this.pageNumber);
    this.pageForm.controls['PageSize'].setValue(this.pageSize);
    this.CustomerService.get(this.pageForm.value, null, "discrepancies").subscribe({
      next: (data: any) => {
        for(let i=0;i<data.content.count;i++){
          data.content.items[i].creationDate = this.persianCalendarService.PersianCalendar(data.content.items[i].creationDate);
        }
        this.ConflictList = data.content.items;
        this.total = data.content.count;
        this.dataLoaded = true;
      },
      error: () => { }
    });
  }

  conflictDetail(id:any){
    this.router.navigateByUrl('Dashboard/');
  }


}
