import {Component} from '@angular/core';
import {OrganizationService} from "../../../core/organization.service";
import {MatDialog, MatDialogConfig, MatSnackBarConfig} from '@angular/material';
import {MatSnackBar} from '@angular/material';
import {find} from 'lodash';


import {OrganizationDialogComponent} from "./dialogs/compose/organization.component";
import {EditComponent} from "./dialogs/edit/edit.component";

@Component({
    selector: 'organizations-list',
    templateUrl: './organizations-list.component.html',
    styleUrls: ['./organizations-list.component.scss']
})
export class OrganizationsListComponent {
    displayedColumns: string[] = ['name', 'buttons'];
    dataSource: any[] = [];

    /**
     * Constructor
     */
    constructor(public dialog: MatDialog,
                private _organizationService: OrganizationService,
                private snackBar: MatSnackBar
    ) {
        this._organizationService.getList().subscribe(dataSource => this.dataSource = dataSource);

    }

    composeOrganizationDialog() {
        const config = new MatDialogConfig();
        config.panelClass = 'organization-compose-dialog';
        config.data = {dataSource: this.dataSource};

        const dialogRef = this.dialog.open(OrganizationDialogComponent, config);

        // dialogRef.afterClosed()
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

    editElement(element) {
        const config = new MatDialogConfig();
        config.panelClass = 'edit-compose-dialog';
        config.data = {
            organization: element,
            dataSource: this.dataSource
        };

        this.dialog.open(EditComponent, config);
    }

    deleteElement(element) {
        const config = new MatSnackBarConfig();
        config.duration = 2000;
        this._organizationService
            .delete(element.id)
            .then(data => this.snackBar.open(
                `Организация '${element.name}' е изтрита успешно.`,
                null,
                config
            ));
    }
}
