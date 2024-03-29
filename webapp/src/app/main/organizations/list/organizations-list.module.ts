import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule, MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatTableModule,
    MatToolbarModule
} from '@angular/material';
import {FuseSharedModule} from '@fuse/shared.module';

import {OrganizationsListComponent} from './organizations-list.component';
import {AuthService} from "../../../core/auth.service";
import {AuthGuard} from "../../../core/auth.guard";
import {OrganizationDialogComponent} from "./dialogs/compose/organization.component";
import {EditComponent} from "./dialogs/edit/edit.component";

const routes = [
    {
        path: 'list',
        component: OrganizationsListComponent,
        canActivate: [AuthGuard],

    }
];

@NgModule({
    declarations: [
        OrganizationsListComponent,
        OrganizationDialogComponent,
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
        MatTableModule,
        MatToolbarModule,


        FuseSharedModule
    ],
    providers: [AuthService],
    entryComponents: [
        OrganizationsListComponent,
        OrganizationDialogComponent,
        EditComponent
    ]
})
export class OrganizationsListModule {
}
