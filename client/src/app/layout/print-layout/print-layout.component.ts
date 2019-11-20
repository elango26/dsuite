import { Component, OnInit } from '@angular/core';
import { PrinterService } from 'src/app/services/printer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-print-layout',
  templateUrl: './print-layout.component.html',
  styleUrls: ['./print-layout.component.scss']
})
export class PrintLayoutComponent implements OnInit {

  formatType:string;
  printdata:any;

  constructor(public printerService: PrinterService, public router: Router) { }

  ngOnInit() {
    console.log('print layout loaded');
    console.log(this.printerService.printData);
    if(this.printerService.printData){
      switch(this.printerService.printData.format){
        case 'invoice':
              this.formatType = 'invoice';
              this.printdata = this.printerService.printData;
              break;
        default:
              console.log("default executed");
              break;
      }
      //this.router.navigate(['/layout',{ outlets: { printpage: 'printview' }}],{ skipLocationChange: true });
      // switch(this.printerService.printData.format){
      //   case 'invoice':
      //     this.router.navigate(['/invoice']);
      //   default:
      //     return false;
      // }
    }
  }

}
