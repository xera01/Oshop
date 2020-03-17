import {AuthService} from './../auth.service';
import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import{ Observable, of } from 'rxjs';
import { AppUser } from '../models/app-user';
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  
  constructor(private  auth: AuthService) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser );//subscribing here to avoid using the async pipe in the html template that causes infinite loop
   }
logout(){
this.auth.logout();
}
  ngOnInit() {
  }

}
