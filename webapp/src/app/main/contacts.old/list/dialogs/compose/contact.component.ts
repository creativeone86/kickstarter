import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {OrganizationService} from "../../../../../core/organization.service";
import {find, isUndefined, get} from 'lodash';
import {ContactService} from "../../../../../core/contact.service";
import {Observable} from "rxjs/Rx";
import * as moment from 'moment';

@Component({
    selector     : 'add-contact',
    templateUrl  : './contact.component.html',
    styleUrls    : ['./contact.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContactComponent
{
    showExtraToFields: boolean;
    composeForm: FormGroup;
    formGroup;
    organizations: Observable<any[]>;
    selectedOrganizationId = null;

    constructor(
        public matDialogRef: MatDialogRef<ContactComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _contactService: ContactService,
        private _organizationService: OrganizationService
    )
    {
        // Set the defaults
        this.composeForm = this.createComposeForm();
        this.showExtraToFields = false;
        this.organizations = _organizationService.getList();

    }

    // checkForDuplicate(control: FormControl) {
    //     const name = control.value;
    //
    //     const match = find(this.data.dataSource, {name});
    //
    //     if (!isUndefined(match)) {
    //         return {
    //             alreadyExists: {value: true}
    //         }
    //     }
    //
    //     return null;
    // }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create compose form
     *
     * @returns {FormGroup}
     */
    createComposeForm(): FormGroup
    {
        let rawDob: {seconds: number} = get(this.data, 'contact.dob', {seconds: 0});
        const defaultDob = rawDob && rawDob.seconds ? moment.unix(rawDob.seconds) : '';


        this.formGroup = new FormGroup({
            name: new FormControl(get(this.data, 'contact.name', ''), [Validators.required]),
            email: new FormControl(get(this.data, 'contact.email', ''), [Validators.required, Validators.email]),
            selectedOrganizationId: new FormControl(get(this.data, 'contact.selectedOrganizationId', ''), [Validators.required]),
            dob: new FormControl(defaultDob)
        });
        return this.formGroup;
    }

    getErrors(field) {
        let msg = '';
        switch (field) {
            case 'name': {
                const isRequired = get(this.formGroup, 'controls.name.errors.required', false);
                const isDuplicate = get(this.formGroup, 'controls.name.errors.alreadyExists', false);

                if (isRequired) msg = 'Името на контакт е задължително.';
                if (isDuplicate) msg = 'Изберете друго име, това е заето.';
                break;
            }
            case 'email': {
                const isRequired = get(this.formGroup, 'controls.email.errors.required', false);
                const isEmail = get(this.formGroup, 'controls.email.errors.email', false);
                if (isRequired) msg = 'Email-a е задължителен.';
                if (isEmail) msg = 'Моля, въведете валиден email адрес.';
                break;
            }
            case 'selectedOrganizationId': {
                const isRequired = get(this.formGroup, 'controls.selectedOrganizationId.errors.required', false);
                if (isRequired) msg = 'Избора на организация е задължителен.';
                break;
            }
        }
        return msg;
    }


    async send(formData: FormGroup) {
        try {
            let data = {
                name: formData.get('name').value,
                email: formData.get('email').value,
                selectedOrganizationId: formData.get('selectedOrganizationId').value,
                dob: formData.get('dob').value ? formData.get('dob').value.toDate() : null
            };


            if(this.data.type === 'add') {
                await this._contactService.save(data);
            } else {
                await this._contactService.edit(this.data.contact.id, data);
            }

        } catch (e) {
        }

        this.matDialogRef.close();
    }
}
