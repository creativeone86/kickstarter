import {Component, Inject} from '@angular/core';
import {OrganizationService} from "../../../core/organization.service";
import {Observable} from "rxjs/Rx";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {OrganizationDialogComponent} from "./dialogs/compose/organization.component";
import {FormGroup} from "@angular/forms";


@Component({
    selector   : 'organizations-list',
    templateUrl: './organizations-list.component.html',
    styleUrls  : ['./organizations-list.component.scss']
})
export class OrganizationsListComponent
{
    displayedColumns: string[] = ['name'];
    dataSource: Observable<any[]>;
    public _matDialog: MatDialog;
    public dialogRef: any;
    /**
     * Constructor
     */
    constructor(
        // public matDialogRef: MatDialogRef<OrganizationDialogComponent>,
        //  @Inject(MAT_DIALOG_DATA) private _data: any,
         private _organizationService: OrganizationService
    )
    {
        this.dataSource = this._organizationService.getList();

    }

    composeOrganizationDialog() {
        // this.dialogRef = this._matDialog.open(OrganizationDialogComponent, {
        //     panelClass: 'organization-compose-dialog'
        // });
        // this.dialogRef.afterClosed()
        //     .subscribe(response => {
        //         if (!response) {
        //             return;
        //         }
        //         const actionType: string = response[0];
        //         const formData: FormGroup = response[1];
        //         switch (actionType) {
        //             /**
        //              * Add
        //              */
        //             case 'add':
        //                 console.log('add organization', formData.getRawValue());
        //                 break;
        //         }
        //     });
    }
}
