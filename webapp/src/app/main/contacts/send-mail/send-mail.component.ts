import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Contact } from '../contact.model';
import {MailService} from "../../../core/mail.service";


@Component({
    selector     : 'contacts-send-mail-dialog',
    templateUrl  : './send-mail.component.html',
    styleUrls    : ['./send-mail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ContactsSendMailDialogComponent
{
    contact: Contact;
    contactForm: FormGroup;

    /**
     *
     * @param {MatDialogRef<ContactsSendMailDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     * @param {MailService} _mailService
     */
    constructor(
        public matDialogRef: MatDialogRef<ContactsSendMailDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _mailService: MailService

    )
    {
        this.contact = _data.contact;

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
        return this._formBuilder.group({
            message: ['']
        });

    }

    sendMail(formData: FormGroup) {
        this._mailService.sendMail(this.contact.email, formData.get('message').value, this.matDialogRef);
    }
}
