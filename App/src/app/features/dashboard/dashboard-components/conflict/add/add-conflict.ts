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
  templateUrl: './add-conflict.html',
  styleUrls: ['./add-conflict.css']
})
export class ConflictAddComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private CustomerService: CustomerService,
    private storage: BrowserStorageService,
    private persianCalendarService: PersianCalendarService,
    private toastr: ToastrService) { }

  @BlockUI() blockUI: NgBlockUI;
  formStep: number = 1;

  addConflictTitleForm = new FormGroup({
    newConflictName: new FormControl('', [Validators.required])
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
    console.log(date1);
  }

  resetForm(){
    /*this.formStep = 1;
    this.addConflictTitleForm.reset();
    this.conflictColumns.reset();
    this.addConflictTitleForm.reset();
    this.addConflictTitleForm.reset();*/
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onFileChange(event: any, type = '') {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (type == 'bank') {
        this.uploadConflictFileForm.patchValue({
          BankFile: file
        });
        this.bankFileIsValid = true;
      }
      if (type == 'company') {
        this.uploadConflictFileForm.patchValue({
          CompanyFile: file
        });
        this.companyFileIsValid = true;
      }
    }
  }


  doAddNewConflictTitle() {
    if (!this.addConflictTitleForm.valid) {
      this.toastr.error('لطفا تمامی موارد را تکمیل کنید');
      return;
    }
    this.blockUI.start();
    this.formStep = 2;
    this.blockUI.stop();
  }

  doAddNewConflictUploadFiles() {
    let fileType: any = this.uploadConflictFileForm.value.BankFile;
    if(fileType == ""){
      this.toastr.error('فرمت فایل ارسالی بانک نامعتبر است');
      return;
    }
    fileType = this.uploadConflictFileForm.value['BankFile'];
    fileType = fileType.name.toString().split('.').pop();
    if (!fileType.startsWith("xls")) {
      this.toastr.error('فرمت فایل ارسالی بانک نامعتبر است');
      return;
    }

    
    fileType = this.uploadConflictFileForm.value.CompanyFile;
    if(fileType == ""){
      this.toastr.error('فرمت فایل ارسالی حسابداری نامعتبر است');
      return;
    }
    fileType = this.uploadConflictFileForm.value['CompanyFile'];
    fileType = fileType.name.toString().split('.').pop();
    if (!fileType.startsWith("xls")) {
      this.toastr.error('فرمت فایل ارسالی حسابداری نامعتبر است');
      return;
    }

    this.blockUI.start();
    this.formStep = 3;

    
    this.bankFileServerColumns = [
      { 'id': '10', 'name': 'توضیحات' },
      { 'id': '11', 'name': 'مبلغ' },
      { 'id': '12', 'name': 'کد رهگیری' },
      { 'id': '13', 'name': 'شناسه کاربر' },
      { 'id': '14', 'name': 'تاریخ' },
      { 'id': '15', 'name': 'تلفن همراه' },
    ];
    this.companyFileServerColumns = [
      { 'id': '20', 'name': 'توضیحات' },
      { 'id': '21', 'name': 'مبلغ' },
      { 'id': '22', 'name': 'کد رهگیری' },
      { 'id': '23', 'name': 'شناسه کاربر' },
      { 'id': '24', 'name': 'تاریخ' },
      { 'id': '25', 'name': 'تلفن همراه' },
    ]
    this.blockUI.stop();

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
