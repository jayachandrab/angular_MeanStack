
import { CartModel } from './../models/cartModel';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { createCounterRangeValidator } from './createCounterRangeValidator';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  
cart:CartModel;
 arr:any=[];
 empty:string;
  constructor(private cartService:ProductsService,private fb: FormBuilder) { }

  ngOnInit() {

    let user=JSON.parse(localStorage.getItem('currentUser'));
    console.log('in cart'+typeof(localStorage.getItem('currentUser')));
    console.log(user.email);

   this.cartService.getCart(user.email).subscribe(cartDetails=>{
     console.log(cartDetails);
   
     let crt:any=cartDetails;
    // console.log(crt.crt[0]);
    if(crt.crt[0]){
     this.cart=crt.crt[0];
     this.arr=this.cart.Items;
     console.log(this.cart.Items);
    }
    else{
      this.empty="Cart is Empty";
    }
   },error=>{
     console.log("error in getting cart"+error);
     this.empty="Cart is Empty";
   }
   
   );
  }

  onDecrement(id:any){
    console.log("in decrement");
    for(let i=0;i<this.arr.length;i++){
      if( this.arr[i]._id==id && this.arr[i].units>=1){
        console.log("matched"+this.arr[i]._id);
        this.arr[i].units=this.arr[i].units-1;
        this.cart.totalQuantity= this.cart.totalQuantity-1;
        this.cart.totalPrice=this.cart.totalPrice-parseInt(this.arr[i].price);
        this.cartService.updateCart(this.cart).subscribe(data=>{

          var temp:any=data;
        this.cart=temp.cart;
   
          console.log("cart updated"+JSON.stringify(this.cart));
        },
        error=>{
         console.log("cart update failed"+error.message);
          console.log(error);
        });
        break;
      }
     }
     
  }

  onIncrement(id:string){
    //let prod=JSON.parse(product);
    console.log("on increment");
    for(let i=0;i<this.arr.length;i++){
     if( this.arr[i]._id==id){
       console.log("matched"+this.arr[i]._id);
       this.arr[i].units=this.arr[i].units+1;
       this.cart.totalQuantity= this.cart.totalQuantity+1;
       this.cart.totalPrice=this.cart.totalPrice+parseInt(this.arr[i].price);
       break;
     }
    }
    this.cartService.updateCart(this.cart).subscribe(data=>{
       
      var temp:any=data;
    this.cart=temp.cart;
      
     console.log("cart updated increment"+JSON.stringify(this.cart));
    },
    error=>{
     console.log("cart update failed increment"+error.message);
      console.log(error);
    });
    
  }

}
