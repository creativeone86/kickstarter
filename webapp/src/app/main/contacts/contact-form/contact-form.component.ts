import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Contact } from '../contact.model';
import {ContactService} from "../../../core/contact.service";
import * as moment from 'moment';
import {get} from 'lodash';
import {Observable} from "rxjs/Rx";
import {OrganizationService} from "../../../core/organization.service";


@Component({
    selector     : 'contacts-contact-form-dialog',
    templateUrl  : './contact-form.component.html',
    styleUrls    : ['./contact-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ContactsContactFormDialogComponent
{
    action: string;
    contact: Contact;
    contactForm: FormGroup;
    dialogTitle: string;
    organizations: Observable<any[]>;
    statusList: string[] = [
        'Редови гражданин',
        'Партиен член',
        'Нпо представител',
        'Отговорник за група хора',
        'Шеф на район/зона',
        'Член на щаб',
        'Твърдо ядро',
        'Отговорник секторни политики'
    ];
    status = new FormControl([]);

    /**
     * Constructor
     *
     * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<ContactsContactFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _contactService: ContactService,
        private _organizationService: OrganizationService)
    {
        this.organizations = _organizationService.getList();

        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Редактирай контакт';
            this.contact = _data.contact;
        }
        else
        {
            this.dialogTitle = 'Добави контакт';
            this.contact = new Contact({});
        }

        this.contactForm = this.createContactForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createContactForm(): FormGroup
    {
        let rawDob: any = get(this.contact, 'dob', {seconds: 0});
        const defaultDob = rawDob && rawDob.seconds ? moment.unix(rawDob.seconds) : '';

        this.status.setValue(this.contact.status);
        return this._formBuilder.group({
            id      : [this.contact.id],
            name    : [this.contact.name],
            middleName: [this.contact.middleName],
            lastName: [this.contact.lastName],
            avatar  : [this.contact.avatar],
            email   : [this.contact.email],
            notes   : [this.contact.notes],
            dob: [defaultDob],
            selectedOrganizationId: [this.contact.selectedOrganizationId],
            mobilePhone: [this.contact.mobilePhone],
            landPhone: [this.contact.landPhone],
            residentialAddress: [this.contact.residentialAddress],
            currentAddress: [this.contact.currentAddress]
        });

    }

    normalizeDob(rawDob = null) {
        return rawDob !== null ? moment.unix(rawDob.seconds).format('MM/DD/YYYY') : null;
    }

    async editContact(formData: FormGroup) {
        try {
            let data = {
                name: formData.get('name').value,
                middleName: formData.get('middleName').value,
                lastName: formData.get('lastName').value,
                email: formData.get('email').value,
                selectedOrganizationId: formData.get('selectedOrganizationId').value,
                dob: formData.get('dob').value ? formData.get('dob').value.toDate() : null,
                status: this.status.value,
                notes: formData.get('notes').value,
                mobilePhone: formData.get('mobilePhone').value,
                landPhone: formData.get('landPhone').value,
                residentialAddress: formData.get('residentialAddress').value,
                currentAddress: formData.get('currentAddress').value
            };

            await this._contactService.edit(this.contact.id, data);

        } catch (e) {
            console.log('error: ', e);
        }
        this.matDialogRef.close();
    }

    async addContact(formData: FormGroup) {
        try {
            let data = {
                name: formData.get('name').value,
                middleName: formData.get('middleName').value,
                lastName: formData.get('lastName').value,
                email: formData.get('email').value,
                selectedOrganizationId: formData.get('selectedOrganizationId').value,
                dob: formData.get('dob').value ? formData.get('dob').value.toDate() : null,
                status: this.status.value,
                notes: formData.get('notes').value,
                mobilePhone: formData.get('mobilePhone').value,
                landPhone: formData.get('landPhone').value,
                residentialAddress: formData.get('residentialAddress').value,
                currentAddress: formData.get('currentAddress').value
            };

            await this._contactService.save(data);
        } catch (e) {
            console.log('error: ', e);
        }
        this.matDialogRef.close();
    }
}
