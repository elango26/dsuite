import { AbstractControl } from '@angular/forms';
//import moment from 'moment';

export class DateValidator {
  static dateVaidator(AC: AbstractControl) {
    let d = new Date();
    let cur_date = d.getFullYear()+'-'+(d.getMonth() + 1) +'-'+d.getDate();
    //if (AC && AC.value && !moment(AC.value, 'YYYY-MM-DD', true).isValid()) {
    if(AC && AC.value && new Date(AC.value) < new Date(cur_date)){
      return { 'dateVaidator': true };
    }
    return null;
  }
}