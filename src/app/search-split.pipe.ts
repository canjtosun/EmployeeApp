import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class SearchSplitPipe implements PipeTransform {

  transform(items: any[], values: string[]): any[] {
    if (!items) {
      return [];
    }
    if (!values || values.length === 0) {
      return items;
    }
    var value1 = values[0].toLowerCase();
    var value2 = values[1].toLowerCase();

    return items.filter(it => {
      return (it.first_name.toLowerCase() >= value1) && (it.first_name.toLowerCase() <= value2);
    });
  }

}
