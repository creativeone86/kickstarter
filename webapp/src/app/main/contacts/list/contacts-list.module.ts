import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule, MatSelectModule,
    MatTableModule,
    MatToolbarModule
} from '@angular/material';
import {FuseSharedModule} from '@fuse/shared.module';

import {ContactsListComponent} from './contacts-list.component';
import {AuthService} from "../../../core/auth.service";
import {AuthGuard} from "../../../core/auth.guard";
import {ContactComponent} from "./dialogs/compose/contact.component";
import {EditComponent} from "./dialogs/edit/edit.component";

const routes = [
    {
        path: 'list',
        component: ContactsListComponent,
        canActivate: [AuthGuard],
    }
];

@NgModule({
    declarations: [
        ContactsListComponent,
        ContactComponent,
        EditComponent
    ],
    imports: [

        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatTableModule,
        MatToolbarModule,


        FuseSharedModule
    ],
    providers: [AuthService],
    entryComponents: [
        ContactsListComponent,
        ContactComponent,
        EditComponent
    ]
})
export class ContactsListModule {
}
