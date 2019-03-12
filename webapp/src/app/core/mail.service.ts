import {Injectable} from '@angular/core';

import 'rxjs/operator/map';
import {AngularFireFunctions} from "@angular/fire/functions";


@Injectable({
    providedIn: 'root'
})
export class MailService {
    constructor(
        private ngFunctions: AngularFireFunctions
    ) {
    }

    sendMail(to, message, ref = null) {
        const callableFn = this.ngFunctions.httpsCallable('channelMail/');
        callableFn({to, message}).subscribe(data => {
            if(ref !== null) {
                ref.close();

            }
        });
    }
}
