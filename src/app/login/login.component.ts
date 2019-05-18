import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { stringify } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData:any;
  submitted = false;

  loginform: FormGroup ;

  constructor(private _router: Router, private userService: UserServiceService) { }

  ngOnInit() {
    this.loginform=new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, Validators.required)
    });
  }
  moveToRegister() {
    this._router.navigate(['/register']);
  }
  login() {
    console.log("in login");
    this.submitted = true;
    if (!this.loginform.valid) {
      console.log('Invalid');
      return;
    }
    else {
      console.log(JSON.stringify(this.loginform.value));

      this.userService.login(JSON.stringify(this.loginform.value))
      .subscribe(
        data => { 
          console.log("in login success");
          var d= JSON.stringify(data);
          this.loginData=data;
          //console.log("==="+data.message); 
         // console.log("===>"+data.user.imagePath); 
         if(data){
          localStorage.setItem('currentUser',  JSON.stringify(this.loginData.user));
          localStorage.setItem('user_session',   JSON.stringify(this.loginData.sess));
         // let temp=JSON.parse(localStorage.getItem('user_session'));
         let temp:any=localStorage.getItem('user_session');
         let temp2=JSON.parse(temp);
          console.log("temp==========>"+temp2.email);
 


         }
         console.log("session details---->"+this.loginData.sess.email);
          console.log("-------------->"+localStorage.getItem('currentUser'));
        this._router.navigate(['/home']); 
      },
        error => console.log(error)
      )
    }
  }


  


}
