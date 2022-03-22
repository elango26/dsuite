import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenericResp } from '../interfaces/genericResp';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    constructor(private router: Router, public http:HttpClient, public snackBar: MatSnackBar, private userservice:UserService) {}

    ngOnInit() {
        this.form = new FormGroup({
            'username': new FormControl('',Validators.required),
            'password': new FormControl('',Validators.required),
            'recaptchaReactive' : new FormControl('',Validators.required)
        })
    }

    async resolved(captchaResponse: string) {
        //console.log(`Resolved response token: ${captchaResponse}`);       
        await this.sendTokenToBackend(captchaResponse);
    }

    sendTokenToBackend(tok){
        //calling the service and passing the token to the service
        this.http.post(environment.urls.captchaValidation,{recaptcha: tok}).subscribe(
          data => {
            console.log(data)
          },
          err => {
            console.log(err)
          },
          () => {}
        );
    }

    onLogin() {
        console.log(this.form);
        if(this.form.status == 'VALID'){
            this.http.post(environment.urls.authenticate,this.form.value).subscribe((data:GenericResp) =>{
                if(data.code == 200){
                    let userDetails = {
                        _id: data.data[0]._id,
                        user_id: data.data[0].user_id,
                        username: data.data[0].username,
                        firstname: data.data[0].firstname,
                        lastname: data.data[0].lastname,
                        email: data.data[0].email,
                        role: data.data[0].role,
                        token: data.data[0].token
                    }     
                    this.userservice.user = userDetails;               
                    localStorage.setItem('userdetails', JSON.stringify(userDetails));
                    localStorage.setItem('isLoggedin', 'true');
                    this.router.navigate(['/layout']);
                }else{
                    this.snackBar.open(data.message, "Error", {
                        duration: 500,
                      });
                }                
              },error =>{
                this.snackBar.open(error, "Error", {
                  duration: 500,
                });
              });            
        }        
    }
}
