import { Injectable } from '@angular/core';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product){
    return this.db.list('/products').push(product);
  }

  getAll(){
    // return this.db.list('/products',  ref => ref.orderByChild('name',)).valueChanges()
    return this.db.list('/products', ref =>ref.orderByChild('name')).snapshotChanges()
    .pipe(
      map(snapshots => {
        return snapshots.map((snapshot) => {
          let data: any = snapshot.payload.val();
          data.key = snapshot.payload.key
          // console.log(data)
          // const key = snapshot.payload.key
          return data
        })
      })
    )
  }

  get(productId){
    return this.db.object('/products/' + productId);

  }
  update(productId, product){
    return  this.db.object('/products/' + productId).update(product);
  }

  delete(productId){
    return  this.db.object('/products/' + productId).remove();

  }
}
