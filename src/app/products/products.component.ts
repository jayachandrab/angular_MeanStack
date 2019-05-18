import { ProductsService } from './../products.service';
import { GlobalApp } from './../global';
import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products1: any;
  prods:any[]=[];
  arr: any[] = [];
  editObj: any;
  ses:any;
  constructor(private http: UserServiceService, private router: Router,private helper:GlobalApp,private productService:ProductsService) { }

  ngOnInit() {
    //this.products1.
    console.log('in products');
    this.products1 = this.http.getProducts().subscribe(
      (data: Response) => {

        // var d= JSON.stringify(data);
        //this.products1=JSON.parse(d); 
        this.products1 = data;
        this.arr = this.products1.products;
        console.log(this.arr);
        console.log("====data" + JSON.stringify(data));

      },
      error => console.log("============" + error)
    );
    console.log(this.products1);


  }

  edit(title: string) {

    console.log("edit====>" + title);

   /* for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i]['title'] == title) {
        this.editObj = this.arr[i];
        break;
      }

    }
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "prod": JSON.stringify(this.editObj)
      }
    };

    console.log(this.editObj);
    this.router.navigate(['/update'], navigationExtras);*/


  }

  delete(title: string) {

    for (let i = 0; i < this.arr.length; i++) 
    {
      if (this.arr[i]['title'] == title) {
        this.arr.splice(i, 1);
      }

    }
    console.log("after deletion");
    this.http.deleteProduct(title).subscribe(data => {
      console.log("after delete from server" + data);

    });
    /* for(let i=0;i<this.arr.length;i++){
       console.log("titlel====>"+this.arr[i].title);
      
     }*/



  }


    add(prods: any) 
    {
      this.ses=this.helper.localStorageItem('user_session');
      if(this.ses.prods){
        this.prods=this.ses.prods;
      }
     
      this.prods.push(prods);
      this.ses.prods=this.prods;

      localStorage.setItem('user_session',   JSON.stringify(this.ses));

      console.log('added to cart product '+prods.productname);
      this.productService.addToCart({product:prods,ses:this.ses}).subscribe(data=>{
        console.log("after adding to cart"+JSON.stringify(data));
      },error=>{
        console.log("Error in adding to cart"+JSON.stringify(error));
      });

    }
    buy(title: string) 
    {
      console.log('buy product '+title);
    }
}
