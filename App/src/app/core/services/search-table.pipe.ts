import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'customerFilter'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val:any) => {
      let rVal = (val.description.toString().toLocaleLowerCase().includes(args)) || (val.code.toString().toLocaleLowerCase().includes(args)  || (val.dateTimePersian.toString().toLocaleLowerCase().includes(args))  || (val.creditor.toString().toLocaleLowerCase().includes(args))  || (val.debtor.toString().toLocaleLowerCase().includes(args)) );
      return rVal;
    })

  }

}