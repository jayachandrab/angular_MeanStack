import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { }

  register(email:string,username:string,password:string,image:File){
    //email:string,username:string,password:string,image:File
   const registerData=new FormData();
    registerData.append('email',email);
    registerData.append('username',username);
    registerData.append('image',image,username);
    registerData.append('password',password);
    console.log("register service form data===> "+ JSON.stringify(registerData));

    return this.http.post('http://localhost:3000/users/register',registerData);
  }

  login(body:any){
    console.log("in service login"+body);
    return this.http.post('http://localhost:3000/login',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
}

getProducts(){
  //return this.http.get('http://localhost:3000/users/products');
  return this.http.get(' http://localhost:3000/product/getproducts');
 

}

deleteProduct(title:string){
console.log("in delete service"+title);
  return this.http.delete('http://localhost:3000/users/delete/'+title);
}

updateProduct(prod:any,title:string){
  console.log('in update service');

  return this.http.put('http://localhost:3000/users/update/',{prod:prod,title:title});

}
}
