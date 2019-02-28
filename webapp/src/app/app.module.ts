import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatButtonModule, MatDialogModule, MatIconModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';

import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import {CoreModule} from "./core/core.module";
import {AuthGuard} from "./core/auth.guard";
import {AdminAuthGuard} from "./core/admin-auth.guard";

const appRoutes: Routes = [
    {
        path: 'auth',
        loadChildren: './main/auth/auth.module#AuthModule'
    },
    {
        path: 'organizations',
        loadChildren: './main/organizations/organizations.module#OrganizationsModule',
    },
    {
        path: 'contacts',
        loadChildren: './main/contacts/contacts.module#ContactsModule',
    },
    {
        path      : '**',
        redirectTo: 'organizations/list'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CoreModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule
    ],
    providers: [
        AuthGuard,
        AdminAuthGuard
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
