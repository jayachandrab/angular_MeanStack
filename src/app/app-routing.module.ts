import { CartComponent } from './cart/cart.component';
import { UpdateComponent } from './update/update.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { AddpoductComponent } from './addpoduct/addpoduct.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:"full"},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},

  {path: 'home', component:HomeComponent},
  {path: 'home/:data', component:HomeComponent},
  {path: 'products', component:ProductsComponent},
  {path: 'update', component:UpdateComponent},
  {path: 'addproduct', component:AddpoductComponent},
  {path:'cart',component:CartComponent}





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
