import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
  return this.auth.appUser$.pipe(
    map((appUser => appUser.isAdmin))
    );

  }
     
 
} 

// canActivate(): Observable<boolean> {
//   return this.auth.appUser$
//     .map((appUser => appUser.isAdmin);
// }
// }


    // return this.auth.user$.pipe(
    //   map((user) => {
    //     this.userService.get(user.uid);
//   })
//     );
 
