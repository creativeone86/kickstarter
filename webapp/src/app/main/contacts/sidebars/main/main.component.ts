import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormGroup} from '@angular/forms';


export interface DialogData {
    animal: string;
    name: string;
}

import { ContactsService } from '../../contacts.service';
import {OrganizationDialogComponent} from "../../dialogs/compose/organization.component";
import {OrganizationService} from "../../../../core/organization.service";

@Component({
    selector   : 'contacts-main-sidebar',
    templateUrl: './main.component.html',
    styleUrls  : ['./main.component.scss']
})
export class ContactsMainSidebarComponent implements OnInit, OnDestroy
{
    user: any;
    filterBy: string;
    dialogRef: any;
    organizations: any[];


    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ContactsService} _contactsService
     */
    constructor(
        private _contactsService: ContactsService,
        public _matDialog: MatDialog,
        private _organizationService: OrganizationService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.filterBy = this._contactsService.filterBy || 'all';

        this._contactsService.onUserDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(user => {
                this.user = user;
            });

        this._organizationService.getList().subscribe((data) => {
            this.organizations = data;
        })
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Change the filter
     *
     * @param filter
     */
    changeFilter(filter): void
    {
        this.filterBy = filter;
        this._contactsService.onFilterChanged.next(this.filterBy);
    }

    composeOrganizationDialog() {
        this.dialogRef = this._matDialog.open(OrganizationDialogComponent, {
            panelClass: 'organization-compose-dialog'
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!response) {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch (actionType) {
                    /**
                     * Add
                     */
                    case 'add':
                        console.log('add organization', formData.getRawValue());
                        break;
                }
            });
    }
}
