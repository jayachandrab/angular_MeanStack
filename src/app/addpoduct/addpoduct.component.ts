import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addpoduct',
  templateUrl: './addpoduct.component.html',
  styleUrls: ['./addpoduct.component.css']
})
export class AddpoductComponent implements OnInit {

  categories:string[]=['male','female','kids'];
  imagePreview:string;
  productModel:any={};
  f:any;
  constructor(private httpServ:ProductsService,private router:Router) { }

  ngOnInit() {
  }

  onImagePicked(event:Event){
    console.log("image picked");
    const file=(event.target as HTMLInputElement).files[0];
    this.f=file;
    console.log(file);
    console.log(this.productModel);
    const reader=new FileReader();
    reader.onload=()=>{
      this.imagePreview=reader.result as string;
    };
    reader.readAsDataURL(file);
  
  }

  onSubmit() {

    console.log("in register");
    console.log(this.productModel);
    if (!this.productModel) {
      console.log("invalid form");
    } else {
      console.log("form units===> "+ this.productModel.units);
      console.log("form units===> "+ this.productModel.price);
      this.httpServ.addProduct(this.productModel.productname,
        this.productModel.productCode,
        this.productModel.description,this.productModel.price,this.productModel.units,this.f).subscribe(
        data => {
          console.log("after register success"+JSON.stringify(data));
          this.router.navigate(['/products']);
        },
        error => { console.log(error); }
      );
      //console.log(JSON.stringify(this.registerForm.value));
    }

   // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.productModel))
  }

  get diagnostic() { return JSON.stringify(this.categories); }

}
