import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { OperatorsComponent } from './operators/operators.component';
import { ProductsComponent } from './products/products.component';
import { TicketsComponent } from './tickets/tickets.component';
import { OpenTicketsComponent } from './open-tickets/open-tickets.component';
import { WorkingTicketsComponent } from './working-tickets/working-tickets.component';
import { CompletedTicketsComponent } from './completed-tickets/completed-tickets.component';

import { AuthenticationService } from './services/authentication.service';
import { UsersService } from './services/users.service';
import { SuppliersService } from './services/suppliers.service';
import { OperatorsService} from './services/operators.service';
import { ProductsService } from './services/products.service';
import { TicketsService } from './services/tickets.service';
import { HazmatsService } from './services/hazmat.service';
import { ItemlistsService } from './services/itemlists.service';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    DashboardComponent,
    UsersComponent,
    SuppliersComponent,
    OperatorsComponent,
    ProductsComponent,
    TicketsComponent,
    OpenTicketsComponent,
    WorkingTicketsComponent,
    CompletedTicketsComponent,
    MyTicketsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule
  ],
  providers: [
    AuthenticationService,
    UsersService,
    SuppliersService,
    OperatorsService,
    ProductsService,
    TicketsService,
    HazmatsService,
    ItemlistsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
