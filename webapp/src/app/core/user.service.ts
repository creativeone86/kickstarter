import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import * as firebase from 'firebase';
import {Observable} from "rxjs/Observable";
import {AngularFirestore} from '@angular/fire/firestore';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly PATH = '/users/';


    constructor(private db: AngularFireDatabase, private firestore: AngularFirestore) {
    }

    get(uid: string): Observable<any> {
        return this.firestore.collection(this.PATH).doc(uid).valueChanges();
    }

    // https://www.techiediaries.com/angular-firestore-tutorial/
    save(user: firebase.User) {
        const loggedInUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            isAdmin: false

        };

        return this.firestore.collection(this.PATH).doc(loggedInUser.id)
            .set(loggedInUser)
            .then(data => data)
            .catch(error => {
                console.log("@err", error);
            })

        // return this.firestore.doc(`users/${loggedInUser.id}`).update(loggedInUser)
        //     .then(data => data)
        //     .catch(error => {
        //        return this.firestore.doc(`users/${loggedInUser.id}`).set({...loggedInUser});
        //     });
    }
}
