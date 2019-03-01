import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {find, isUndefined, get} from 'lodash';
import {ContactService} from "../../../../../core/contact.service";

@Component({
    selector     : 'edit-contact',
    templateUrl  : './edit.component.html',
    styleUrls    : ['./edit.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class EditComponent
{
    showExtraToFields: boolean;
    composeForm: FormGroup;
    name;

    /**
     *
     * @param {MatDialogRef<OrganizationDialogComponent>} matDialogRef
     * @param _data
     * @param {ContactService} _contactService
     */
    constructor(
        public matDialogRef: MatDialogRef<EditComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _contactService: ContactService
    )
    {
        // Set the defaults
        this.composeForm = this.createComposeForm();
        this.showExtraToFields = false;
    }

    checkForDuplicate(control: FormControl) {
        const name = control.value;

        const match = find(this._data.dataSource, {name});

        if (!isUndefined(match)) {
            return {
                alreadyExists: {value: true}
            }
        }

        return null;
    }

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
        this.name = new FormGroup({
            name: new FormControl(this._data.contact.name, [Validators.required, this.checkForDuplicate.bind(this)])
        });
        return this.name;
    }

    getErrorMessage() {
        const isRequired = get(this.name, 'controls.name.errors.required', false);
        const isDuplicate = get(this.name, 'controls.name.errors.alreadyExists', false);
        let msg = '';

        if(isRequired) msg = 'Името на контакта е задължително.';
        if(isDuplicate) msg = 'Изберете друго име, това е заето.';

        return msg;
    }

    async editContact(formData: FormGroup) {
        try {
            await this._contactService.edit(this._data.contact.id, {name: formData.get('name').value});
        } catch (e) {
            console.log("@e", e);
        }

        this.matDialogRef.close();


    }
}
