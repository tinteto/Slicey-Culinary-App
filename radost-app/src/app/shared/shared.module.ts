import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MomentPipePipe } from './pipes/moment-pipe.pipe';
import { EmojiPipe } from './pipes/emoji.pipe';
import { SplitPipe } from './pipes/split.pipe';





@NgModule({
  declarations: [ MomentPipePipe, EmojiPipe, SplitPipe ], //components, directives, pipes
  imports: [
    CommonModule,
    RouterModule, //! IMPORTANT
  ],
  exports: [MomentPipePipe, EmojiPipe, SplitPipe], //components, directives, pipes

})
export class SharedModule { }
