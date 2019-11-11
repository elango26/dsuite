import { Component, OnInit } from '@angular/core';
import { PrinterService } from 'src/app/services/printer.service';

@Component({
  selector: 'app-print-layout',
  templateUrl: './print-layout.component.html',
  styleUrls: ['./print-layout.component.scss']
})
export class PrintLayoutComponent implements OnInit {

  constructor(public printerService: PrinterService) { }

  ngOnInit() {
    console.log('print layout loaded');
    console.log(this.printerService.printData);
  }

}
