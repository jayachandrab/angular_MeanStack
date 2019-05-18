import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import {mimeType} from './mime.type.validator'; 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  imagePreview:string;
  submitted = false;
  constructor(private router: Router, private userService: UserServiceService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      username: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)
        ]
      }),
      password: new FormControl(null, Validators.required),
      cpass: new FormControl(null, Validators.required),
      image:new FormControl(null, Validators.required)
    });
  }

  moveToLogin() {
    this.router.navigate(['/login']);
  }

  register() {
    this.submitted = true;
    console.log("in register"+this.registerForm.value);
    if (!this.registerForm.valid || (this.registerForm.controls.password.value != this.registerForm.controls.cpass.value)) {
      console.log("invalid form");
    } else {
      console.log("form image===> "+ this.registerForm.value.image);
   
      this.userService.register(this.registerForm.value.email,this.registerForm.value.username,this.registerForm.value.password,this.registerForm.value.image,).subscribe(
        data => {
          console.log("after register success"+data);
          this.router.navigate(['/login']);
        },
        error => { console.log(error); }
      );
      //console.log(JSON.stringify(this.registerForm.value));
    }
  }

  onImagePicked(event:Event){
    console.log("image picked");
    const file=(event.target as HTMLInputElement).files[0];
    this.registerForm.patchValue({image:file});
    this.registerForm.get('image').updateValueAndValidity();
    console.log(file);
    console.log(this.registerForm);
    const reader=new FileReader();
    reader.onload=()=>{
      this.imagePreview=reader.result as string;
    };
    reader.readAsDataURL(file);
  
  }
}
