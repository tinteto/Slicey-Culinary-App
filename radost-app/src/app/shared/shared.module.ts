import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecipeEmojiPipe } from './pipes/recipe-emoji.pipe';
import { SplitPipe } from './pipes/split.pipe';




@NgModule({
  declarations: [
    RecipeEmojiPipe,
    SplitPipe,
  ], //components, directives, pipes
  imports: [
    CommonModule,
    RouterModule, //! IMPORTANT
  ],
  exports: [RecipeEmojiPipe, SplitPipe], //components, directives, pipes

})
export class SharedModule { }
