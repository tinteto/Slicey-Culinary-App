import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recipeEmoji'
})
export class RecipeEmojiPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return `🍉 ${value}`;
  }

}
