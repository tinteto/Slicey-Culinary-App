import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [], //components, directives, pipes
  imports: [
    CommonModule,
    RouterModule, //! IMPORTANT
  ],
  exports: [] //components, directives, pipes
})
export class SharedModule { }
