import {NgModule} from '@angular/core';
import {FuseSharedModule} from '@fuse/shared.module';

import {ContactsListModule} from './list/contacts-list.module';

@NgModule({
    imports: [
        FuseSharedModule,
        ContactsListModule
    ]
})
export class ContactsModule {

}
