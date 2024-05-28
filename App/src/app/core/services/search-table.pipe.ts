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
      let rVal = (val.description.toLocaleLowerCase().includes(args)) || (val.code.toLocaleLowerCase().includes(args));
      return rVal;
    })

  }

}