import { Injectable } from '@angular/core';
import { Printer } from '../interfaces/printer';

@Injectable({
  providedIn: 'root'
})
export class PrinterService {
  printData: Printer;
  constructor() { }
}
