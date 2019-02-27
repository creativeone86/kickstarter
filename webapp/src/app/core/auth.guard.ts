import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";
import 'rxjs/add/operator/map';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private _authService: AuthService,
        private _router: Router
    ) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this._authService.user$.map(user => {
            if(user) return true;
            // TODO: change to proper route
            this._router.navigate(
                ['/auth/login'],
                {queryParams: {returnUrl: state.url}});
            return false;
        });
    }
}
