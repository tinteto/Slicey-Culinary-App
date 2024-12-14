import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emoji'
})
export class EmojiPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return `🍉 ${value}`;
  }

}

//import/export pipe module, import в модулите, в които ще се ползва