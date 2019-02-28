import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {OrganizationService} from "../../../../core/organization.service";

@Component({
    selector     : 'add-organization',
    templateUrl  : './organization.component.html',
    styleUrls    : ['./organization.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OrganizationDialogComponent
{
    showExtraToFields: boolean;
    composeForm: FormGroup;

    /**
     *
     * @param {MatDialogRef<OrganizationDialogComponent>} matDialogRef
     * @param _data
     * @param {OrganizationService} _organizationService
     */
    constructor(
        public matDialogRef: MatDialogRef<OrganizationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _organizationService: OrganizationService
    )
    {
        // Set the defaults
        this.composeForm = this.createComposeForm();
        this.showExtraToFields = false;
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
        return new FormGroup({
            name: new FormControl('')
            // from   : new FormControl({
            //     value   : 'johndoe@creapond.com',
            //     disabled: true
            // }),
            // to     : new FormControl(''),
            // cc     : new FormControl(''),
            // bcc    : new FormControl(''),
            // subject: new FormControl(''),
            // message: new FormControl('')
        });
    }

    /**
     * Toggle extra to fields
     */
    toggleExtraToFields(): void
    {
        this.showExtraToFields = !this.showExtraToFields;
    }

    async addOrganization(formData: FormGroup) {

        try {
            const result = await this._organizationService.save({name: formData.get('name').value});
            console.log("@result", result);
        } catch (e) {
            console.log("@e", e);
        }

        this.matDialogRef.close();

    }
}
