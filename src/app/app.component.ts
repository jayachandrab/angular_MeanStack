import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontent';
  loginData:any=null;
 
  constructor(private router:Router){
    this.loginData=JSON.parse(localStorage.getItem('currentUser'));

  }
  logOut(){
    console.log("logout");
    localStorage.clear();
    this.router.navigate(['/login']);

  }
}
