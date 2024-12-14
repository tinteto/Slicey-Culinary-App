
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {

  transform(value: string[], ...args: unknown[]): string {
   // console.log(value);
   // console.log(value.toString());
    //console.log(value.join('\n'));
    
    return `${value.join('\n')}`;
  
    
  }

}

// Prepare ingredients,Mix ingredients,Cook until done