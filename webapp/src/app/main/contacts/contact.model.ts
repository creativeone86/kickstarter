import { FuseUtils } from '@fuse/utils';

export class Contact
{
    id: string;
    name: string;
    middleName: string;
    lastName: string;
    avatar: string;
    email: string;
    notes: string;
    dob: string;
    selectedOrganizationId: string;
    status: string[];
    mobilePhone: string;
    landPhone: string;
    residentialAddress: string;
    currentAddress: string;

    /**
     * Constructor
     *
     * @param contact
     */
    constructor(contact)
    {
        {
            this.id = contact.id || FuseUtils.generateGUID();
            this.name = contact.name || '';
            this.middleName = contact.middleName || '';
            this.lastName = contact.lastName || '';
            this.avatar = contact.avatar || 'assets/images/avatars/profile.jpg';
            this.email = contact.email || '';
            this.notes = contact.notes || '';
            this.dob = contact.dob || '';
            this.selectedOrganizationId = contact.selectedOrganizationId || '';
            this.status = contact.status || [];
            this.mobilePhone = contact.mobilePhone || '';
            this.landPhone = contact.landPhone || '';
            this.residentialAddress = contact.residentialAddress || '';
            this.currentAddress = contact.currentAddress || '';

        }
    }
}
