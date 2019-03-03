import {Component} from '@angular/core';
import {MatDialog, MatDialogConfig, MatSnackBarConfig} from '@angular/material';
import {MatSnackBar} from '@angular/material';
import {find} from 'lodash';


import {ContactComponent} from "./dialogs/compose/contact.component";
import {EditComponent} from "./dialogs/edit/edit.component";
import {ContactService} from "../../../core/contact.service";
import {OrganizationService} from "../../../core/organization.service";
import * as moment from 'moment';


@Component({
    selector: 'contacts-list',
    templateUrl: './contacts-list.component.html',
    styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent {
    displayedColumns: string[] = [
        'name',
        'email',
        'selectedOrganizationId',
        'dob',
        'buttons'
    ];
    dataSource: any[] = [];
    organizations = [];

    /**
     * Constructor
     */
    constructor(public dialog: MatDialog,
                private _contactService: ContactService,
                private _organizationService: OrganizationService,
                private snackBar: MatSnackBar) {
        this._contactService.getList().subscribe(dataSource => this.dataSource = dataSource);
        this._organizationService.getList().subscribe(organizations => this.organizations = organizations);

    }

    getOrganizationName(id) {
        return find(this.organizations, {id}, null);
    }

    openAdd(element = null) {
        const config = new MatDialogConfig();
        config.panelClass = 'person-compose-dialog';
        config.data = {
            dataSource: this.dataSource,
            type: 'add'
        };

        if (element !== null) {
            config.data.contact = element;
            config.data.type = 'edit';
        }

        this.dialog.open(ContactComponent, config);
    }

    normalizeDob(rawDob = null) {
        return rawDob !== null ? moment.unix(rawDob.seconds).format('MM/DD/YYYY') : null;
    }

    editElement(element) {
        const config = new MatDialogConfig();
        config.panelClass = 'edit-compose-dialog';
        config.data = {
            contact: element,
            dataSource: this.dataSource
        };

        this.dialog.open(EditComponent, config);
    }

    deleteElement(element) {
        const config = new MatSnackBarConfig();
        config.duration = 2000;
        this._contactService
            .delete(element.id)
            .then(data => this.snackBar.open(
                `Контакт '${element.name}' е изтрит успешно.`,
                null,
                config
            ));
    }
}
