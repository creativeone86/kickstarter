import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import * as firebase from 'firebase';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router'
import {UserService} from "./user.service";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import {User} from "./models/user";
import {MatSnackBar} from '@angular/material';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public user$: Observable<firebase.User>;

    constructor(private _afAuth: AngularFireAuth,
                private _route: ActivatedRoute,
                private _router: Router,
                private _userService: UserService,
                public snackBar: MatSnackBar
    ) {
        this.user$ = _afAuth.authState;
    }

    loginWithEmail(email, password) {
        const returnUrl = this._route.snapshot.queryParamMap.get('returnUrl') || '/apps/contacts';
        localStorage.setItem('returnUrl', returnUrl);
        this._afAuth.auth.signInWithEmailAndPassword(email, password)
            .then((res: any) => {
                const user: firebase.User = res.user;
                this._userService.save(user);
                this._router.navigate([localStorage.getItem('returnUrl')]);
            })
            .catch((err) => {
                this.snackBar.open('Грешка при вписване', '', {
                    duration: 2000,
                    panelClass: 'snackbar-error'
                });
            });
    }

    loginWithFacebook() {
        const returnUrl = this._route.snapshot.queryParamMap.get('returnUrl') || '/apps/contacts';
        localStorage.setItem('returnUrl', returnUrl);
        this._afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
            .then((res: any) => {
                const user: firebase.User = res.user;
                this._userService.save(user);
                this._router.navigate([localStorage.getItem('returnUrl')]);
            })
            .catch((err) => {
                this.snackBar.open('Грешка при вписване', '', {
                    duration: 2000,
                    panelClass: 'snackbar-error'
                });
            });

    }

    signOut() {
        this._afAuth.auth.signOut();
        this._router.navigate(['/auth/login']);

    }

    get appUser$(): Observable<User> {
        return this.user$
            .switchMap(user => user ? this._userService.get(user.uid) : Observable.of(null));
    }
}
