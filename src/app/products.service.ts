import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartModel } from './models/cartModel';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  addProduct(productname:string,productcode:string,description:string,price:string,units:string,image:File){
    console.log('in add service');

    console.log("in service price"+price);

    const registerData=new FormData();
    registerData.append('productname',productname);
    registerData.append('productcode',productcode);
    registerData.append('image',image,productname);
    registerData.append('description',description);
    registerData.append('price',price);
    registerData.append('units',units);
    console.log("register service form data===> "+ JSON.stringify(registerData));

    return this.http.post('http://localhost:3000/product/addproducts',registerData);

  }
  addToCart(item:any){
    return this.http.post('http://localhost:3000/product/addtocart',item);
  }
  getCart(userId:string){
    return this.http.get('http://localhost:3000/product/getcart/'+userId);
  }
  updateCart(cart:CartModel){
    return this.http.post('http://localhost:3000/product/updatecart',{cart:cart});
  }
}
