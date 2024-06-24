import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductComponent } from './pages/list-product/list-product.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { DeleteProductComponent } from './pages/delete-product/delete-product.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'product/list',
    component: ListProductComponent
  },
  {
    path: 'product/add',
    component: AddProductComponent
  },
  {
    path: 'product/edit',
    component: EditProductComponent
  },
  {
    path: 'product/delete',
    component: DeleteProductComponent
  },
  {
    path: 'product/register',
    component: RegisterComponent
  },
  {
    path: 'product/login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
