import { Injectable } from '@angular/core';
@Injectable()
export class PersianCalendarService {
  weekDayNames: string[] = ["شنبه", "یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه"];
  monthNames: string[] = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند"];
  strWeekDay: any = null;
  strMonth: any = null;
  day: any = null;
  month: any = null;
  year: any = null;
  ld: any = null;
  farsiDate: any = null;

  today: Date = new Date();

  gregorianYear: any = null;
  gregorianMonth: any = null;
  gregorianDate: any = null;
  WeekDay: any = null;
  buf1: number[] = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  buf2: number[] = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];

  constructor() {
  }
  PersianCalendar(gregorianDate: any): string {
    this.today = new Date(gregorianDate);
    this.gregorianYear = this.today.getFullYear();
    this.gregorianMonth = this.today.getMonth() + 1;
    this.gregorianDate = this.today.getDate();
    this.WeekDay = this.today.getDay();
    this.toPersian(gregorianDate);
    return this.year + "/" + Math.floor(this.month) + "/" + this.day;
  }

  GeorgianCalendar(persianDate: any): string {

    let year = persianDate.toString().split('/')[0];
    let month = persianDate.toString().split('/')[1];
    let day = persianDate.toString().split('/')[2];

    let gDate  = this.jalaliToGregorian(year , month , day);
    return gDate[0] + "/" + gDate[1] + "/" + gDate[2];
  }

  toPersian(gregorianDate: any) {
    if ((this.gregorianYear % 4) != 0)
      this.farsiDate = this.func1();
    else
      this.farsiDate = this.func2();
    this.strMonth = this.monthNames[Math.floor(this.month - 1)];
    this.strWeekDay = this.weekDayNames[(this.WeekDay + 1) % 7];
  }

  JalaliDate: any = {
    g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29]
  };

  jalaliToGregorian(j_y: any, j_m: any, j_d: any) {
    j_y = parseInt(j_y);
    j_m = parseInt(j_m);
    j_d = parseInt(j_d);
    let jy:number = j_y - 979;
    let jm: any = j_m - 1;
    let jd: any = j_d - 1;

    let j_day_no:number = 365 * jy + Math.floor(jy / 33) * 8 + Math.floor((jy % 33 + 3) / 4);
    for (var i = 0; i < jm; ++i) {
      j_day_no += this.JalaliDate.j_days_in_month[i];
    }

    j_day_no += jd;

    var g_day_no = j_day_no + 79;

    var gy = 1600 + 400 * Math.floor(g_day_no / 146097); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
    g_day_no = g_day_no % 146097;

    var leap = true;
    if (g_day_no >= 36525) /* 36525 = 365*100 + 100/4 */ {
      g_day_no--;
      gy += 100 * Math.floor(g_day_no / 36524); /* 36524 = 365*100 + 100/4 - 100/100 */
      g_day_no = g_day_no % 36524;

      if (g_day_no >= 365) g_day_no++;
      else leap = false;
    }

    gy += 4 * Math.floor(g_day_no / 1461); /* 1461 = 365*4 + 4/4 */
    g_day_no %= 1461;

    if (g_day_no >= 366) {
      leap = false;

      g_day_no--;
      gy += Math.floor(g_day_no / 365);
      g_day_no = g_day_no % 365;
    }

    for (var i = 0; g_day_no >= this.JalaliDate.g_days_in_month[i] + (i == 1 && leap); i++)
      g_day_no -= this.JalaliDate.g_days_in_month[i] + (i == 1 && leap);
    let gm:number = i + 1;
    let gd:number = g_day_no + 1;

    gm = gm < 10 ? 0 + gm : gm;
    gd = gd < 10 ? 0 + gd : gd;

    return [gy, gm, gd];
  }



  func1(): string {
    this.day = this.buf1[this.gregorianMonth - 1] + this.gregorianDate;
    if (this.day > 79) {
      this.day = this.day - 79;
      if (this.day <= 186) {
        var day2 = this.day;
        this.month = (day2 / 31) + 1;
        this.day = (day2 % 31);
        if (day2 % 31 == 0) {
          this.month--;
          this.day = 31;
        }
        this.year = this.gregorianYear - 621;
      }
      else {
        var day2: any = this.day - 186;
        this.month = (day2 / 30) + 7;
        this.day = (day2 % 30);
        if (day2 % 30 == 0) {
          this.month = (day2 / 30) + 6;
          this.day = 30;
        }
        this.year = this.gregorianYear - 621;
      }
    }
    else {
      this.ld = this.gregorianYear > 1996 && this.gregorianYear % 4 == 1 ? 11 : 10;
      var day2 = this.day + this.ld;
      this.month = (day2 / 30) + 10;
      this.day = (day2 % 30);
      if (day2 % 30 == 0) {
        this.month--;
        this.day = 30;
      }
      this.year = this.gregorianYear - 622;
    }
    var fullDate = this.day + "/" + Math.floor(this.month) + "/" + this.year;
    return fullDate
  }
  func2(): any {
    //console.log("entered func2");
    this.day = this.buf2[this.gregorianMonth - 1] + this.gregorianDate;
    this.ld = this.gregorianYear >= 1996 ? 79 : 80;
    if (this.day > this.ld) {
      this.day = this.day - this.ld;
      if (this.day <= 186) {
        var day2 = this.day;
        this.month = (day2 / 31) + 1;
        this.day = (day2 % 31);
        if (day2 % 31 == 0) {
          this.month--;
          this.day = 31;
        }
        this.year = this.gregorianYear - 621;
      } else {
        var day2: any = this.day - 186;
        this.month = (day2 / 30) + 7;
        this.day = (day2 % 30);
        if (day2 % 30 == 0) {
          this.month--;
          this.day = 30;
        }
        this.year = this.gregorianYear - 621;
      }
      var fullDate = this.day + "/" + Math.floor(this.month) + "/" + this.year;
      return fullDate
    }
    else {
      var day2 = this.day + 10;
      this.month = (day2 / 30) + 10;
      this.day = (day2 % 30);
      if (day2 % 30 == 0) {
        this.month--;
        this.day = 30;
      }
      this.year = this.gregorianYear - 622;
    }
  }
}