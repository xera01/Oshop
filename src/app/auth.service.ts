import {Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from './models/app-user';
import {UserService} from './user.service';

import {of} from 'rxjs'; 
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private router: Router, 
    private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
   }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl' , returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider() );

  }

  logout(){
    this.afAuth.auth.signOut();
  }

  get appUser$() : Observable<AppUser> {
    return this.user$.pipe(
    switchMap(user => {
      if(user) return this.userService.get(user.uid);
      else
      return of(null);
    }
    ));
    
    }
    
    
  }

//   get appUser$(): Observable<any | null> {
//     return this.user$.pipe(
//       switchMap(user => user 
//         ? this.userService.get(user.uid).valueChanges()
//         : of(null)
//         )
//     );
//   }
// }
