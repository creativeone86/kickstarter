import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";
import 'rxjs/add/operator/map';
import {UserService} from "./user.service";

@Injectable({
    providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

    constructor(
        private _authService: AuthService,
        private _userService: UserService,
        private _router: Router
    ) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this._authService.appUser$
            .map(appUser => {
                    if(!appUser || !appUser.isAdmin) {
                        this._router.navigate(['/auth/login']);
                    }
                    return appUser.isAdmin || false;
                }
            );
    }
}
