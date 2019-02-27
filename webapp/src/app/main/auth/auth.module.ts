import {NgModule} from '@angular/core';

import {LoginModule} from './login/login.module';
// import {Register2Module} from 'app/main/pages/authentication/register-2/register-2.module';
// import {ForgotPassword2Module} from 'app/main/pages/authentication/forgot-password-2/forgot-password-2.module';
// import {ResetPassword2Module} from 'app/main/pages/authentication/reset-password-2/reset-password-2.module';
// import {LockModule} from 'app/main/pages/authentication/lock/lock.module';
// import {MailConfirmModule} from 'app/main/pages/authentication/mail-confirm/mail-confirm.module';

@NgModule({
    imports: [
        // Authentication
        LoginModule,
        // Register2Module,
        // ForgotPassword2Module,
        // ResetPassword2Module,
        // LockModule,
        // MailConfirmModule,
    ]
})
export class AuthModule {

}
