import { AppUser } from './models/app-user';
import { AngularFireDatabase, AngularFireObject,  } from 'angularfire2/database';
import { Injectable } from '@angular/core';


import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }
    save(user: firebase.User){
      console.log(user)
      this.db.object('/users/' + user.uid).update({
        name: user.displayName,
        email: user.email
      })
    }

    get(uid: string): Observable<AppUser> {
      return this.db.object<AppUser>('/users/' + uid).valueChanges();
    }
 
}
