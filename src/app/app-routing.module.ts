import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAddProductComponent } from './admin-add-product/admin-add-product.component';
import { AdminAuthComponent } from './admin-auth/admin-auth.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminUpdateProductComponent } from './admin-update-product/admin-update-product.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchComponent } from './search/search.component';
import { UserAuthComponent } from './user-auth/user-auth.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path:'admin-auth',component:AdminAuthComponent
  },
  {
    path:'admin-home',component:AdminHomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'admin-add-product',component:AdminAddProductComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'admin-update-product/:id',component:AdminUpdateProductComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'search/:query',component:SearchComponent
  },
  {
    path:'details/:productId',component:ProductDetailsComponent
  },
  {
    path:'user-auth',component:UserAuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
