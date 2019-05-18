import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  oldtitle:string='';
  prod: any;     
  constructor(private route: ActivatedRoute,private http:UserServiceService,private router:Router) { }

  ngOnInit() {
   // super.ngOnInit();
   console.log("in update===");

    this.route.queryParams.subscribe(params => {
      this.prod = JSON.parse(params["prod"]);
      this.oldtitle=this.prod.title;
      console.log(JSON.parse(params["prod"]));
    });
  }
  createOrUpdate(){
    console.log(this.prod);
    console.log('old title'+this.oldtitle);
    this.http.updateProduct(this.prod,this.oldtitle).subscribe(data=>{
      console.log("update success"+data);
      this.router.navigate(['/products']);
    });

  }
}
