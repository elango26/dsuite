import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DatePipe } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { GenericResp } from 'src/app/interfaces/genericResp';
import { UserService } from 'src/app/services/user.service';

// export interface PeriodicElement {
//     name: string;
//     position: number;
//     weight: number;
//     symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//     { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//     { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//     { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//     { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//     { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//     { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//     { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' }
// ];

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    displayedColumns = ['sno', 'username', 'payments', 'sales', 'total'];
    dataSource: MatTableDataSource<any>;
    places: Array<any> = [];
    matGrids:any[];
    creditsList:any[];
    session: any;
    selectedDate: Date = new Date();

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    constructor(public datePipe:DatePipe, public commonService: CommonService,public userService:UserService) {
        this.matGrids = [
            {
                'class':'danger',
                'icon':'local_shipping',
                'count':0,
                'label':'Sales'
            },
            {
                'class':'warn',
                'icon':'shopping_cart',
                'count':0,
                'label':'Purchases'
            },
            {
                'class':'success',
                'icon':'functions',
                'count':0,
                'label':'Expenses'
            },
            {
                'class':'info',
                'icon':'remove_shopping_cart',
                'count':0,
                'label':'Damages'
            }
        ]; 
        this.places = [
            {
                imgSrc: 'assets/images/card-1.jpg',
                place: 'Cozy 5 Stars Apartment',
                description:
                    // tslint:disable-next-line:max-line-length
                    'The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Barcelona.',
                charge: '$899/night',
                location: 'Barcelona, Spain'
            },
            {
                imgSrc: 'assets/images/card-2.jpg',
                place: 'Office Studio',
                description:
                    // tslint:disable-next-line:max-line-length
                    'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the night life in London, UK.',
                charge: '$1,119/night',
                location: 'London, UK'
            },
            {
                imgSrc: 'assets/images/card-3.jpg',
                place: 'Beautiful Castle',
                description:
                    // tslint:disable-next-line:max-line-length
                    'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Milan.',
                charge: '$459/night',
                location: 'Milan, Italy'
            }
        ];
    }

    ngOnInit() {
        this.session = this.userService.user;
        if(this.session.role == 'ADMIN' || this.session.role == 'SUPERADMIN')
            this.loadDashboard();

        this.loadCredits();
    }

    refreshAll(){
        this.loadDashboard();
        this.loadCredits();
    }

    loadCredits(){
        let q = "?date="+this.datePipe.transform(this.selectedDate,"yyyy-MM-dd");
        if(this.session.role == 'USER'){
            q+= "&user_id="+this.session.user_id;
        }
        this.commonService.getMethod(environment.urls.getCreditList+q).subscribe((data:GenericResp)=>{
            console.log(data);
            if(data.code == 200){
                if(this.session.role == 'ADMIN' || this.session.role == 'SUPERADMIN'){
                    if(data.data.payments.length > 0){
                        let res = data.data.payments;
                        let sales = data.data.sales;
                        let temp_arr = [];
                        for(var key in res){
                            let temp = {
                                'username': res[key].username[0],
                                'payments': res[key].total_credits,
                                'sales': sales.filter(s => s.username[0]==res[key].username[0])[0].total_credits
                            }
                            temp_arr.push(temp);                        
                        }                    
                        this.dataSource = new MatTableDataSource(temp_arr);
                    }
                }else{
                    let payments = data.data.payments?data.data.payments[0].total_credits:0;
                    let sales = data.data.sales?data.data.sales[0].total_credits:0;
                    let total = payments + sales;
                    let user_view = [
                        {
                            'class':'danger',
                            'icon':'local_shipping',
                            'count': payments,
                            'label':'Payments'
                        },
                        {
                            'class':'warn',
                            'icon':'shopping_cart',
                            'count': sales,
                            'label':'Sales'
                        },
                        {
                            'class':'success',
                            'icon':'functions',
                            'count': total,
                            'label':'Total'
                        }
                    ];
                    this.creditsList = user_view;
                }
                //this.creditsList.concat(data.data.payments,data.data.sales);
            }
        })
    }

    loadDashboard(){
        let q = '?date='+this.datePipe.transform(this.selectedDate,"yyyy-MM-dd");
        this.commonService.getMethod(environment.urls.getDashboardGrids+q).subscribe((data:GenericResp) =>{
            if(data.code == 200){
                var details = data.data;
                this.matGrids.forEach((element)=>{
                    if(details[element.label.toLowerCase()].length > 0)
                        element.count = details[element.label.toLowerCase()][0].value;
                    else
                        element.count = 0;
                });
            }
        });
    }
}
