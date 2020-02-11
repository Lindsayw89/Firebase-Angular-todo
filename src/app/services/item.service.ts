import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Item} from  '../models/item';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  constructor(private angularFS : AngularFirestore ) { 
    // this.items= this.angularFS.collection('items').valueChanges();  

    this.itemsCollection=this.angularFS.collection('items', ref => ref.orderBy('title', 'asc'));
    this.items= this.itemsCollection.snapshotChanges().map (changes =>{
      return changes.map(a=> {
        const data = a.payload.doc.data() as Item;
        data.id=a.payload.doc.id;
        return data;
      })
    })  }
  getItems(){
    return this.items;
  }
  addItem(item: Item){
    this.itemsCollection.add(item);
  }
 
}
