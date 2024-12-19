import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MomentPipePipe } from './pipes/moment-pipe.pipe';
import { EmojiPipe } from './pipes/emoji.pipe';
import { SliceStringPipe } from './pipes/slice-string.pipe';



@NgModule({
  declarations: [ MomentPipePipe, EmojiPipe, SliceStringPipe ], //components, directives, pipes
  imports: [
    CommonModule,
    RouterModule, //! IMPORTANT
  ],
  exports: [MomentPipePipe, EmojiPipe, SliceStringPipe ], //components, directives, pipes

})
export class SharedModule { }
