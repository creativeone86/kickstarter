import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {AngularFirestore} from '@angular/fire/firestore';
import 'rxjs/operator/map';


@Injectable({
    providedIn: 'root'
})
export class ContactService {

    private readonly PATH = '/contacts/';

    constructor(private firestore: AngularFirestore) {
    }

    get(uid: string): Observable<any> {
        return this.firestore.doc(`${this.PATH}${uid}`).valueChanges();
    }

    getList(): Observable<any[]> {
        return this.firestore.collection(this.PATH).snapshotChanges().map(users => {
            return users.map((user) => {
                return {
                    id: user.payload.doc.id,
                    ...user.payload.doc.data()
                }
            })
        })
    }

    edit(id, data) {
        return this.firestore.collection(this.PATH)
            .doc(id)
            .set(data)
            .then(saved => saved)
            .catch(error => {
                console.log("@err", error);
            })
    }

    save(contact) {
        return this.firestore.collection(this.PATH)
            .add(contact)
            .then(data => data)
            .catch(error => {
                console.log("@err", error);
            })
    }

    delete(contactId: string) {
        return this.firestore.collection(this.PATH).doc(contactId).delete();
    }
}
