import { AbstractControl } from '@angular/forms';
//import moment from 'moment';

export class DateValidator {
  static dateVaidator(AC: AbstractControl) {
    //if (AC && AC.value && !moment(AC.value, 'YYYY-MM-DD', true).isValid()) {
    if(AC && AC.value && new Date(AC.value) < new Date()){
      return { 'dateVaidator': true };
    }
    return null;
  }
}