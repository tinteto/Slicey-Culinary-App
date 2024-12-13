import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return `${value.split('\n')}`;
  }

}


// const {name, ingredients, steps, img} = form.value; //взимам въведените стойности от формата
// const stringIngr = ingredients.split('\n');
// const stringSteps = steps.split('\n');