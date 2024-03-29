import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule, MatCheckboxModule, MatChip, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule,
    MatMenuModule, MatRippleModule, MatSelectModule, MatTableModule, MatToolbarModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';

import { ContactsComponent } from './contacts.component';
import { ContactsService } from './contacts.service';
import { ContactsContactListComponent } from './contact-list/contact-list.component';
import { ContactsSelectedBarComponent } from './selected-bar/selected-bar.component';
import { ContactsMainSidebarComponent } from './sidebars/main/main.component';
import { ContactsContactFormDialogComponent } from './contact-form/contact-form.component';
import {AuthGuard} from "../../core/auth.guard";
import {ContactsSendMailDialogComponent} from "./send-mail/send-mail.component";

const routes: Routes = [
    {
        path     : '**',
        component: ContactsComponent,
        canActivate: [AuthGuard],
        resolve  : {
            contacts: ContactsService
        }
    }
];

@NgModule({
    declarations   : [
        ContactsComponent,
        ContactsContactListComponent,
        ContactsSelectedBarComponent,
        ContactsMainSidebarComponent,
        ContactsContactFormDialogComponent,
        ContactsSendMailDialogComponent
    ],
    imports        : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,
        MatSelectModule,

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule
    ],
    providers      : [
        ContactsService
    ],
    entryComponents: [
        ContactsContactFormDialogComponent,
        ContactsSendMailDialogComponent
    ]
})
export class ContactsModule
{
}
