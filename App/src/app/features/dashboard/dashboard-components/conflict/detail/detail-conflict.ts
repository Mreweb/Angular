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
 
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-home',
  templateUrl: './detail-conflict.html',
  styleUrls: ['./detail-conflict.css']
})
export class ConflictDetailComponent implements OnInit {
  initialConflictList: any;
  groupList: any = [];
  groupListRemoveId: string;
  pageConflictInfo: any;

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
  pageConflictId: any = this.route.snapshot.paramMap.get('id') || "";
  addConflictTitleForm = new FormGroup({
    title: new FormControl('', [Validators.required])
  });

  bankFileIsValid: boolean = false;
  companyFileIsValid: boolean = false;
  uploadConflictFileForm = new FormGroup({
    BankFile: new FormControl('', [Validators.required]),
    CompanyFile: new FormControl('', [Validators.required]),
  });

  bankFileSheetName: any;
  bankFileServerColumns: any;

  companyFileSheetName: any;
  companyFileServerColumns: any;


  conflictColumns = new FormGroup({
    BankSheet: new FormControl('', [Validators.required]),
    BankSheetStartRow: new FormControl('', [Validators.required]),

    BankTitle: new FormControl('', [Validators.required]),
    BankDeptor: new FormControl('', [Validators.required]),
    BankCreditor: new FormControl('', [Validators.required]),
    BankReferenceCode: new FormControl('', [Validators.required]),
    BankDate: new FormControl('', [Validators.required]),

    CompanySheet: new FormControl('', [Validators.required]),
    CompanySheetStartRow: new FormControl('', [Validators.required]),

    CompanyTitle: new FormControl('', [Validators.required]),
    CompanyDeptor: new FormControl('', [Validators.required]),
    CompanyCreditor: new FormControl('', [Validators.required]),
    CompanyReferenceCode: new FormControl('', [Validators.required]),
    CompanyDate: new FormControl('', [Validators.required])

  });

  bankRecords: any;
  companyRecords: any;
  hasErrorInRecords: boolean = false;

  ngOnInit(): void {

    this.CustomerService.get(null, null, "discrepancies/" + this.pageConflictId).subscribe({
      next: (data: any) => {
        this.blockUI.stop();
        this.pageConflictInfo = data.content;
        if (this.pageConflictInfo.isRecordsLoaded) {
          this.initConflict();
        } else {
          this.addConflictTitleForm.controls['title'].setValue(this.pageConflictInfo.title);
          this.formStep = 2;
        }
        this.toastr.success('دریافت مغایرت گیری با موفقیت انجام شد');
      },
      error: (data: any) => {
        this.blockUI.stop();
        this.toastr.error(data.message);
      }
    });


  }

  download(url: any) {

    FileSaver.saveAs(APP_DI_CONFIG.ApiEndPoint + url, "Report.xls");
    
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
      if (fileType == "") {
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
        this.http.post(APP_DI_CONFIG.ApiEndPoint + "discrepancies/" + this.pageConflictId + "/bank/excel/upload", formData).subscribe((data: any) => {
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
        this.http.post(APP_DI_CONFIG.ApiEndPoint + "discrepancies/" + this.pageConflictId + "/accounting/excel/upload", formData).subscribe((data: any) => {
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

    this.blockUI.start();

    //this.CustomerService.get(null, null, "/api/discrepancies/bank/"+this.pageConflictId+"/sheets").subscribe({
    this.CustomerService.get(null, null, "discrepancies/" + this.pageConflictId + "/bank/excel/sheets").subscribe({
      next: (data: any) => {
        this.bankFileSheetName = data.content;
      },
      error: (data: any) => {
        this.toastr.error(data.message);
      }
    });

    this.CustomerService.get(null, null, "discrepancies/" + this.pageConflictId + "/accounting/excel/sheets").subscribe({
      next: (data: any) => {
        this.companyFileSheetName = data.content;
      },
      error: (data: any) => {
        this.toastr.error(data.message);
      }
    });
    this.blockUI.stop();

  }

  getSheetColumns(file = '') {

    this.blockUI.start();
    if (file == 'bank') {
      this.CustomerService.get({
        'sheetName': this.conflictColumns.controls['BankSheet'].value,
        'firstRow': this.conflictColumns.controls['BankSheetStartRow'].value
      }, null, "discrepancies/" + this.pageConflictId + "/bank/excel/columns").subscribe({
        next: (data: any) => {
          this.bankFileServerColumns = data.content;
          console.log(this.bankFileServerColumns);
        },
        error: (data: any) => {
          this.toastr.error(data.message);
        }
      });
    }
    if (file == 'company') {
      this.CustomerService.get({
        'sheetName': this.conflictColumns.controls['CompanySheet'].value,
        'firstRow': this.conflictColumns.controls['CompanySheetStartRow'].value
      }, null, "discrepancies/" + this.pageConflictId + "/accounting/excel/columns").subscribe({
        next: (data: any) => {
          this.companyFileServerColumns = data.content;
        },
        error: (data: any) => {
          this.toastr.error(data.message);
        }
      });
    }
    this.blockUI.stop();
  }

  doAddNewConflictSelectColumns() {
    this.blockUI.start();

    let BankTitleString = "";
    let BankDeptorString = "";
    let BankCreditorString = "";
    let BankReferenceCodeString = "";
    let BankDateString = "";
    for (let i = 0; i < this.bankFileServerColumns.length; i++) {
      if (this.bankFileServerColumns[i].column == this.conflictColumns.controls['BankTitle'].value) {
        BankTitleString = this.bankFileServerColumns[i].title;
      }
      if (this.bankFileServerColumns[i].column == this.conflictColumns.controls['BankDeptor'].value) {
        BankDeptorString = this.bankFileServerColumns[i].title;
      }
      if (this.bankFileServerColumns[i].column == this.conflictColumns.controls['BankCreditor'].value) {
        BankCreditorString = this.bankFileServerColumns[i].title;
      }
      if (this.bankFileServerColumns[i].column == this.conflictColumns.controls['BankReferenceCode'].value) {
        BankReferenceCodeString = this.bankFileServerColumns[i].title;
      }
      if (this.bankFileServerColumns[i].column == this.conflictColumns.controls['BankDate'].value) {
        BankDateString = this.bankFileServerColumns[i].title;
      }
    }
    this.CustomerService.put({
      "discrepancyId": this.pageConflictId,
      "sheetName": this.conflictColumns.controls['BankSheet'].value,
      "firstRow": this.conflictColumns.controls['BankSheetStartRow'].value,
      "description": {
        "column": this.conflictColumns.controls['BankTitle'].value,
        "title": BankTitleString
      },
      "code": {
        "column": this.conflictColumns.controls['BankReferenceCode'].value,
        "title": BankReferenceCodeString
      },
      "debtor": {
        "column": this.conflictColumns.controls['BankDeptor'].value,
        "title": BankDeptorString
      },
      "creditor": {
        "column": this.conflictColumns.controls['BankCreditor'].value,
        "title": BankCreditorString
      },
      "dateTime": {
        "column": this.conflictColumns.controls['BankDate'].value,
        "title": BankDateString
      }
    }, null, "discrepancies/" + this.pageConflictId + "/bank/mappings").subscribe({
      next: (data: any) => {
        this.toastr.success('ثبت ستون های بانک با موفقیت انجام شد');

        let CompanyTitleString = "";
        let CompanyDeptorString = "";
        let CompanyCreditorString = "";
        let CompanyReferenceCodeString = "";
        let CompanyDateString = "";
        for (let i = 0; i < this.companyFileServerColumns.length; i++) {
          if (this.companyFileServerColumns[i].column == this.conflictColumns.controls['CompanyTitle'].value) {
            CompanyTitleString = this.companyFileServerColumns[i].title;
          }
          if (this.companyFileServerColumns[i].column == this.conflictColumns.controls['CompanyDeptor'].value) {
            CompanyDeptorString = this.companyFileServerColumns[i].title;
          }
          if (this.companyFileServerColumns[i].column == this.conflictColumns.controls['CompanyCreditor'].value) {
            CompanyCreditorString = this.companyFileServerColumns[i].title;
          }
          if (this.companyFileServerColumns[i].column == this.conflictColumns.controls['CompanyReferenceCode'].value) {
            CompanyReferenceCodeString = this.companyFileServerColumns[i].title;
          }
          if (this.companyFileServerColumns[i].column == this.conflictColumns.controls['CompanyDate'].value) {
            CompanyDateString = this.companyFileServerColumns[i].title;
          }
        }
        this.CustomerService.put({
          "discrepancyId": this.pageConflictId,
          "sheetName": this.conflictColumns.controls['CompanySheet'].value,
          "firstRow": this.conflictColumns.controls['CompanySheetStartRow'].value,
          "description": {
            "column": this.conflictColumns.controls['CompanyTitle'].value,
            "title": CompanyTitleString
          },
          "code": {
            "column": this.conflictColumns.controls['CompanyReferenceCode'].value,
            "title": CompanyReferenceCodeString
          },
          "debtor": {
            "column": this.conflictColumns.controls['CompanyDeptor'].value,
            "title": CompanyDeptorString
          },
          "creditor": {
            "column": this.conflictColumns.controls['CompanyCreditor'].value,
            "title": CompanyCreditorString
          },
          "dateTime": {
            "column": this.conflictColumns.controls['CompanyDate'].value,
            "title": CompanyDateString
          }
        }, null, "discrepancies/" + this.pageConflictId + "/accounting/mappings").subscribe({
          next: (data: any) => {
            this.toastr.success('ثبت ستون های حسابداری با موفقیت انجام شد');
            this.doGetRecords()
            this.blockUI.stop();
          },
          error: (data: any) => {
            this.toastr.error(data.message);
          }
        });

        this.formStep = 4;

      },
      error: (data: any) => {
        this.toastr.error(data.message);
      }
    });






  }


  doGetRecords() {
    this.formStep = 4;
    this.CustomerService.get(null, null, "discrepancies/" + this.pageConflictId + "/bank/excel/records").subscribe({
      next: (data: any) => {
        this.bankRecords = data.content;
        for (let i = 0; i < this.bankRecords.length; i++) {
          this.bankRecords[i].checked = false;
          this.bankRecords[i].isExcluded = false;

          this.bankRecords[i].dateTimePersian = this.persianCalendarService.PersianCalendar(this.bankRecords[i].dateTime);
          if (this.bankRecords[i].recordInfo.hasError) {
            this.hasErrorInRecords = true;
          }
        }
      },
      error: (data: any) => {
        this.toastr.error(data.message);
      }
    });

    this.CustomerService.get(null, null, "discrepancies/" + this.pageConflictId + "/accounting/excel/records").subscribe({
      next: (data: any) => {
        this.companyRecords = data.content;
        for (let i = 0; i < this.companyRecords.length; i++) {
          this.companyRecords[i].checked = false;
          this.companyRecords[i].isExcluded = false;
          this.companyRecords[i].dateTimePersian = this.persianCalendarService.PersianCalendar(this.companyRecords[i].dateTime);
          if (this.companyRecords[i].recordInfo.hasError) {
            this.hasErrorInRecords = true;
          }
        }
      },
      error: (data: any) => {
        this.toastr.error(data.message);
      }
    });

  }

  doSaveRecordsForStartConflict() {
    let bankRecordsTemp = [];
    for (let i = 0; i < this.bankRecords.length; i++) {
      if (!this.bankRecords[i].recordInfo.hasError) {
        bankRecordsTemp.push(this.bankRecords[i]);
      }
    }
    this.CustomerService.put({
      'discrepancyId': this.pageConflictId,
      'items': bankRecordsTemp
    }, null, "discrepancies/" + this.pageConflictId + "/bank/records").subscribe({
      next: (data: any) => {
        this.toastr.success(data.message);
      },
      error: (data: any) => {
        this.toastr.error(data.message);
      }
    });


    let companyRecordsTemp = [];
    for (let i = 0; i < this.companyRecords.length; i++) {
      if (!this.companyRecords[i].recordInfo.hasError) {
        companyRecordsTemp.push(this.companyRecords[i]);
      }
    }
    this.CustomerService.put({
      'discrepancyId': this.pageConflictId,
      'items': companyRecordsTemp
    }, null, "discrepancies/" + this.pageConflictId + "/accounting/records").subscribe({
      next: (data: any) => {
        this.initConflict();
        this.toastr.success(data.message);
      },
      error: (data: any) => {
        this.toastr.error(data.message);
      }
    });



  }

  addManualGroup() {

    let bankRecordsTemp = [];
    let bankRecordsIds = [];
    for (let i = 0; i < this.bankRecords.length; i++) {
      if (this.bankRecords[i].checked) {
        this.bankRecords[i].isExcluded = true;
        this.bankRecords[i].checked = false;
        bankRecordsTemp.push(this.bankRecords[i]);
        bankRecordsIds.push(this.bankRecords[i].id);

      }
    }

    let companyRecordsTemp = [];
    let companyRecordsIds = [];
    for (let i = 0; i < this.companyRecords.length; i++) {
      if (this.companyRecords[i].checked) {
        this.companyRecords[i].isExcluded = true;
        this.companyRecords[i].checked = false;
        companyRecordsTemp.push(this.companyRecords[i]);
        companyRecordsIds.push(this.companyRecords[i].id);
      }
    }

    this.groupList.push({
      bankRecords: bankRecordsTemp,
      accountingRecords: companyRecordsTemp,
    });


    this.CustomerService.put({
      'discrepancyId': this.pageConflictId,
      'bankRecords': bankRecordsIds,
      'accountingRecords': companyRecordsIds,
    }, null, "discrepancies/" + this.pageConflictId + "/manual-group").subscribe({
      next: (data: any) => {
        this.groupListRemoveId = data.content;
        this.groupList[this.groupList.length - 1].groupListRemoveId = this.groupListRemoveId;
        this.toastr.success(data.message);
      },
      error: (data: any) => {
        this.toastr.error(data.message);
      }
    });

  }


  removeManualGroup(id: any) {


    this.CustomerService.put({
      'discrepancyId': this.pageConflictId,
      'group': id
    }, null, "discrepancies/" + this.pageConflictId + "/remove-group").subscribe({
      next: (data: any) => {
        this.initConflict();
        this.toastr.success(data.message);
      },
      error: (data: any) => {
        this.toastr.error(data.message);
      }
    });

  }


  initConflict() {
    this.formStep = 5;
    this.CustomerService.get(null, null, "discrepancies/" + this.pageConflictId).subscribe({
      next: (data: any) => {
        this.groupList = [];
        this.initialConflictList = data.content.recordGroups;
        if (this.initialConflictList.length == 1) {
          this.bankRecords = this.initialConflictList[0].bankRecords;
          this.companyRecords = this.initialConflictList[0].accountingRecords;
        } else {
          for (let i = 0; i < this.initialConflictList.length; i++) {
            if (this.initialConflictList[i].group == null) {
              this.bankRecords = this.initialConflictList[i].bankRecords;
              this.companyRecords = this.initialConflictList[i].accountingRecords;
            } else {
              this.groupList.push({
                bankRecords: this.initialConflictList[i].bankRecords,
                accountingRecords: this.initialConflictList[i].accountingRecords,
                groupListRemoveId: this.initialConflictList[i].group
              });
            }
          }
        }

        for (let i = 0; i < this.bankRecords.length; i++) {
          this.bankRecords[i].checked = false;
          this.bankRecords[i].dateTimePersian = this.persianCalendarService.PersianCalendar(this.bankRecords[i].dateTime);
        }
        for (let i = 0; i < this.companyRecords.length; i++) {
          this.companyRecords[i].checked = false;
          this.companyRecords[i].dateTimePersian = this.persianCalendarService.PersianCalendar(this.companyRecords[i].dateTime);
        }

        this.toastr.success(data.message);
      },
      error: (data: any) => {
        this.toastr.error(data.message);
      }
    });
  }


  autoConflict() {
    this.CustomerService.put({
      "keepCurrentGroups": false
    }, null, "discrepancies/" + this.pageConflictId + "/auto-group").subscribe({
      next: (data: any) => {
        this.initConflict();
      },
      error: (data: any) => {
        this.toastr.error(data.message);
      }
    });
  }



}
