import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import * as firebase from 'firebase';
import {Observable} from "rxjs/Observable";
import {AngularFirestore} from '@angular/fire/firestore';
import {Organization} from "./models/organization";
import 'rxjs/operator/map';


@Injectable({
    providedIn: 'root'
})
export class OrganizationService {

    private readonly PATH = '/organizations/';

    constructor(private firestore: AngularFirestore) {
    }

    get(uid: string): Observable<any> {
        return this.firestore.doc(`${this.PATH}${uid}`).valueChanges();
    }

    getList(): Observable<any[]> {
        return this.firestore.collection(this.PATH).snapshotChanges().map(rawOrganizations => {
            return rawOrganizations.map((organization) => {
                return {
                    id: organization.payload.doc.id,
                    ...organization.payload.doc.data()
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

    save(organization: {name: string, id?: string}) {
        return this.firestore.collection(this.PATH)
            .add(organization)
            .then(data => data)
            .catch(error => {
                console.log("@err", error);
            })

        // return this.firestore.doc(`${this.PATH}${organization.id}`).update(organization)
        //     .then(data => data)
        //     .catch(error => {
        //         return this.firestore.doc(`${this.PATH}${organization.id}`).set({...organization});
        //     });
    }

    delete(organizationId: string) {
        return this.firestore.collection(this.PATH).doc(organizationId).delete();
    }
}
