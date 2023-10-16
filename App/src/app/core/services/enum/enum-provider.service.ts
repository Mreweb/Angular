import { BrowserStorageService } from './../storage/browser-storage.service';
import { Injectable } from '@angular/core';
import { AdapterService } from '@app/core/services/adapter/adapter.service';
import { HttpRestService } from '@app/core/services/http-rest/http-rest.service';

@Injectable()
export class EnumProviderService extends AdapterService<any> {

  constructor(private storage: BrowserStorageService, protected override rest: HttpRestService) {
    super(rest, 'Initial','exam');
  }
  initEnum(): void {
    let enumInfo: any[]

    let data = [
      {
        "name": "ExamState", "description": "وضعیت آزمون",
        "members":
          [
            { "key": 1, "value": "WaitingForApprove", "definition": "در انتظار تایید" },
            { "key": 2, "value": "Approved", "definition": "تایید شده" }
          ]
      },
      {
        "name": "ExamType", "description": "نوع آزمون خارجی/قابل ارائه به سایر سامانه ها",
        "members":
          [
            { "key": "1", "value": "CareerFitter", "definition": "تناسب شغلی" },
            { "key": "2", "value": "Hasht", "definition": "آزمون هشت" },
            { "key": "3", "value": "OldHasht", "definition": "آزمون هشت قدیم" }
          ]
      },
      {
        "name": "ExamScope", "description": "وضعیت آزمون",
        "members":
          [
            { "key": "1", "value": "Internal", "definition": "درون سازمانی" },
            { "key": "2", "value": "External", "definition": "برون سازمانی" }
          ]
      },
      {
        "name": "ExamCalendar", "description": "تقویم ماهانه",
        "members":
          [
            { "key": "1", "value": "فروردین", "definition": "فروردین" },
            { "key": "2", "value": "اردیبهشت", "definition": "اردیبهشت" },
            { "key": "3", "value": "خرداد", "definition": "خرداد" },
            { "key": "4", "value": "تیر", "definition": "تیر" },
            { "key": "5", "value": "مرداد", "definition": "مرداد" },
            { "key": "6", "value": "شهریور", "definition": "شهریور" },
            { "key": "7", "value": "مهر", "definition": "مهر" },
            { "key": "8", "value": "آبان", "definition": "آبان" },
            { "key": "9", "value": "آذر", "definition": "آذر" },
            { "key": "10", "value": "دی", "definition": "دی" },
            { "key": "11", "value": "بهمن", "definition": "بهمن" },
            { "key": "12", "value": "اسفند", "definition": "اسفند" }
          ]
      },
      {
        "name": "ExamCalendarMonthNameToMonthNumber", "description": "تبدیل نام ماه به روز ماه",
        "members":
          [
            { "key": "فروردین", "value": "1", "definition": "1" },
            { "key": "اردیبهشت", "value": "2", "definition": "2" },
            { "key": "خرداد", "value": "3", "definition": "3" },
            { "key": "تیر", "value": "4", "definition": "4" },
            { "key": "مرداد", "value": "5", "definition": "5" },
            { "key": "شهریور", "value": "6", "definition": "6" },
            { "key": "مهر", "value": "7", "definition": "7" },
            { "key": "آبان", "value": "8", "definition": "8" },
            { "key": "آذر", "value": "9", "definition": "9" },
            { "key": "دی", "value": "10", "definition": "10" },
            { "key": "بهمن", "value": "1", "definition": "11" },
            { "key": "اسفند", "value": "12", "definition": "12" }
          ]
      },


    ];
    this.storage.setLocal("enumData", data);
    //this.get({}).subscribe(data => { this.storage.setLocal("enumData", data);});
  }

  getEnum(enumName: string): enumMemberInfo[] {
    const enumData = this.storage.getLocal("enumData");
    const enumInfo = enumData.filter(w => w.name === enumName)[0];
    if (enumInfo !== null && enumInfo != undefined) {
  
      return enumInfo.members;
    }
    return [];
  }
  getEnumDescription(enumName: string,enumNumber:string){
     let enumArray:any[]=this.getEnum(enumName);
   
      let enumObject=(enumArray.length>0)? enumArray.filter(f=>f.key===enumNumber)[0]:{definition:''};
      return enumObject.definition;
  }
} 

export class enumInfo {
  name: string;
  members: enumMemberInfo[];
  constructor() {
    this.name = "";
    this.members = [];
  }
}

export class enumMemberInfo {
  value: string;
  key: number;
  definition: string;
  constructor() {
    this.value = "";
    this.key = 0;
    this.definition = "";
  }
}
