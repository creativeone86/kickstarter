import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFireDatabase, AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFirestore} from "@angular/fire/firestore";
import {MatSnackBarModule} from "@angular/material";
import {MailService} from "./mail.service";
import {AngularFireFunctions, AngularFireFunctionsModule} from "@angular/fire/functions";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireFunctionsModule,
        MatSnackBarModule

    ],
    exports: [],
    providers: [
        AngularFireAuth,
        AngularFirestore,
        AngularFireDatabase,
        AngularFireFunctions,
        MailService
    ]
})
export class CoreModule {
}
