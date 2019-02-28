import {NgModule} from '@angular/core';
import {FuseSharedModule} from '@fuse/shared.module';

import {OrganizationsListModule} from './list/organizations-list.module';

@NgModule({
    imports: [
        FuseSharedModule,
        OrganizationsListModule
    ]
})
export class OrganizationsModule {

}
