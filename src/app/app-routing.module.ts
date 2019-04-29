import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { OperatorsComponent } from './operators/operators.component';
import { ProductsComponent } from './products/products.component';
import { TicketsComponent } from './tickets/tickets.component';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';

const routes: Routes = [
  {
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'suppliers',
    component: SuppliersComponent
  },
  {
    path: 'operators',
    component: OperatorsComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'tickets',
    component: TicketsComponent
  },
  {
    path: 'mytickets',
    component: MyTicketsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
