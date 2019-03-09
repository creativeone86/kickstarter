import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable"

import 'rxjs/operator/map';
import {AngularFireFunctions} from "@angular/fire/functions";


@Injectable({
    providedIn: 'root'
})
export class MailService {

    private readonly apiPath = 'https://us-central1-pcrm-e2901.cloudfunctions.net/helloWorld';

    constructor(
        private ngFunctions: AngularFireFunctions
    ) {
    }

    sendMail(to, message, ref = null) {
        const callableFn = this.ngFunctions.httpsCallable('helloWorld/');
        callableFn({to, message}).subscribe(data => {
            console.log('@data', data);
            if(ref !== null) {
                ref.close();

            }
        });
    }
}
