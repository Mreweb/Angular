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
  templateUrl: './add-conflict.html',
  styleUrls: ['./add-conflict.css']
})
export class ConflictAddComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private CustomerService: CustomerService,
    private storage: BrowserStorageService,
    private persianCalendarService: PersianCalendarService,
    private toastr: ToastrService) { }

  @BlockUI() blockUI: NgBlockUI;
  formStep: number = 1;
  pageConflictId: any;

  addConflictTitleForm = new FormGroup({
    title: new FormControl('', [Validators.required])
  });

  bankFileIsValid: boolean = false;
  companyFileIsValid: boolean = false;
  uploadConflictFileForm = new FormGroup({
    BankFile: new FormControl('', [Validators.required]),
    CompanyFile: new FormControl('', [Validators.required]),
  });

  bankFileServerColumns: any;
  companyFileServerColumns: any;
  conflictColumns = new FormGroup({
    BankSheet: new FormControl('', [Validators.required]),
    BankTitle: new FormControl('', [Validators.required]),
    BankPrice: new FormControl('', [Validators.required]),
    BankTrackingCode: new FormControl('', [Validators.required]),
    BankDate: new FormControl('', [Validators.required]),
    CompanySheet: new FormControl('', [Validators.required]),
    CompanyTitle: new FormControl('', [Validators.required]),
    CompanyPrice: new FormControl('', [Validators.required]),
    CompanyTrackingCode: new FormControl('', [Validators.required]),
    CompanyDate: new FormControl('', [Validators.required]),
  });


  ngOnInit(): void {
    let date1 = this.persianCalendarService.PersianCalendar("2000-10-31T01:30:00.000-05:00");
    

    this.doAddNewConflictUploadFiles();


  }

  resetForm() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onFileChange(event: any, type = '') {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      let fileType: any = file;
      if(fileType == ""){
        this.toastr.error('فرمت فایل ارسالی نامعتبر است');
        return;
      } 
      fileType = fileType.name.toString().split('.').pop();
      if (!fileType.startsWith("xls")) {
        this.toastr.error('فرمت فایل ارسالی نامعتبر است');
        return;
      }

      if (type == 'bank') {
        this.uploadConflictFileForm.patchValue({
          BankFile: file
        });
        this.bankFileIsValid = true; 
        const formData = new FormData();
        formData.append("file", file);
        this.blockUI.start();
        this.http.post(APP_DI_CONFIG.ApiEndPoint+"discrepancies/"+this.pageConflictId+"/bank/excel/upload", formData).subscribe((data: any) => { 
          this.toastr.success(data.message);
          this.blockUI.stop();
        }); 
      }
      if (type == 'company') {
        this.uploadConflictFileForm.patchValue({
          CompanyFile: file
        }); 
        const formData = new FormData();
        formData.append("file", file);
        this.http.post(APP_DI_CONFIG.ApiEndPoint+"discrepancies/"+this.pageConflictId+"/accounting/excel/upload", formData).subscribe((data: any) => {
          this.toastr.success(data.message);
        }); 
        this.companyFileIsValid = true;
      }
    }
  }


  //DONE
  doAddNewConflictTitle() {
    if (!this.addConflictTitleForm.valid) {
      this.toastr.error('لطفا تمامی موارد را تکمیل کنید');
      return;
    }

    this.blockUI.start();
    this.CustomerService.post(this.addConflictTitleForm.value, null, "discrepancies").subscribe({
      next: (data: any) => {
        this.blockUI.stop();
        this.pageConflictId = data.content.id;
        this.toastr.success('افزودن مغایرت گیری جدید با موفقیت انجام شد');
        this.formStep = 2;
      },
      error: (data: any) => {
        this.blockUI.stop();
        this.toastr.error(data.message);
      }
    });
  }

  doAddNewConflictUploadFiles() {

    this.formStep = 3;
    this.bankFileServerColumns = [
      { 'id': '10', 'name': 'توضیحات' },
      { 'id': '11', 'name': 'بدهکار' },
      { 'id': '12', 'name': 'بستانکار' },
      { 'id': '13', 'name': 'کد رهگیری' },
      { 'id': '14', 'name': 'شناسه کاربر' },
      { 'id': '15', 'name': 'تاریخ' }
    ];
    this.companyFileServerColumns = [
      { 'id': '10', 'name': 'توضیحات' },
      { 'id': '11', 'name': 'بدهکار' },
      { 'id': '12', 'name': 'بستانکار' },
      { 'id': '13', 'name': 'کد رهگیری' },
      { 'id': '14', 'name': 'شناسه کاربر' },
      { 'id': '15', 'name': 'تاریخ' }
    ]

  }






  doAddNewConflictSelectColumns() {
    if (!this.conflictColumns.valid) {
      this.toastr.error('لطفا تمامی ستون ها را کنید');
      return;
    }
    this.blockUI.start();
    this.formStep = 4;
    this.blockUI.stop();
  }




}
