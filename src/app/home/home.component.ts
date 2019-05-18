import { GlobalApp } from './../global';
import { LoginComponent } from './../login/login.component';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
loginData:any;
ses:any;
  constructor(private router:Router,private route:ActivatedRoute,private helper:GlobalApp) { }

  ngOnInit() {
   //console.log(JSON.stringify(this.loginData));
    //this.ses=JSON.parse(localStorage.getItem('user_session'));
   // console.log("in home session "+this.ses);
   //this.loginData=
   this.ses=this.helper.localStorageItem('user_session');
   this.loginData=JSON.parse(localStorage.getItem('currentUser'));
   //console.log(JSON.stringify(this.loginData));
      console.log("in initi data"+this.loginData.username) ;
  }

}

