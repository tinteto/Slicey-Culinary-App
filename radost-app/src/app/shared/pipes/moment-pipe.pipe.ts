import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';


@Pipe({
  name: 'momentPipe'
})
export class MomentPipePipe implements PipeTransform {

  transform(date: number, ...args: unknown[]): unknown {
    return moment(date).format('ll');
  }

}
//moment().format("MMM Do YY");  ('ll');
