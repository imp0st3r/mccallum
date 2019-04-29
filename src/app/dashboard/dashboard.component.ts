import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isLoggedIn: Boolean=false;
  currentUser: any;
  openTickets: any;
  currentUsers: any;


  constructor(
    private as:AuthenticationService,
    private router:Router,
    private us:UsersService
  ) { }

  ngOnInit() {
    if(this.as.isLoggedIn()){
      this.as.loggedI.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
      this.as.currentU.subscribe(currentUser => this.currentUser = currentUser);
      this.currentUser = this.as.currentUser();
      //console.log(this.currentUser);
      this.us.getUsers().subscribe({
        next:(result:any)=>{
          this.currentUsers = result;
        }
      })
    }
  }

}
