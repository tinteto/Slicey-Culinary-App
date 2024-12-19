import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceString',
})
export class SliceStringPipe implements PipeTransform {
  transform(value: string, maxCount = 22): string {
    return `${value.substring(0, maxCount)}   
    ${ value.length > maxCount ? '...' : ''}`;
  }
}


