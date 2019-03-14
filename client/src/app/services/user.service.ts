import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user:any;
  constructor() { 
    this.user = {
      _id:"asdasdkafjs23214",
      username:'Deepan'
    }
  }
}
