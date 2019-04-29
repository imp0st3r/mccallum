import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit,AfterViewInit {
  isLoggedIn:Boolean=false;
  currentUser: any;

  constructor(
    private as:AuthenticationService,
    private router:Router
  ) { }

  ngAfterViewInit() { 
    if(this.as.isLoggedIn()){
      this.isLoggedIn = this.as.isLoggedIn();
      this.currentUser = this.as.currentUser();
    }else{
      this.as.loggedI.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
      this.as.currentU.subscribe(currentUser => this.currentUser = currentUser);
      this.router.navigate(['/login']);
    } 
  }
  ngOnInit() {
    this.as.loggedI.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    this.as.currentU.subscribe(currentUser => this.currentUser = currentUser);
    if(this.as.isLoggedIn()){
      this.isLoggedIn = this.as.isLoggedIn();
      this.currentUser = this.as.currentUser();
    }else{
      this.as.loggedI.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
      this.as.currentU.subscribe(currentUser => this.currentUser = currentUser);
      this.router.navigate(['/login']);
    }
  }
  logout(){
    this.as.logout();
    if(this.as.isLoggedIn()){
      this.isLoggedIn = this.as.isLoggedIn();
      this.currentUser = this.as.currentUser();
    }else{
      this.isLoggedIn = false;
      this.currentUser = {};
      this.router.navigate(['/login']);
    }
  }
  nav(link){
    this.router.navigate([link]);
  }
}
