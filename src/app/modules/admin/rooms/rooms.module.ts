import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { RoomsComponent } from 'app/modules/admin/rooms/rooms.component';

import { DxButtonModule } from 'devextreme-angular';
import { DxDataGridComponent,
    DxDataGridModule,
    DxSelectBoxModule,
    DxCheckBoxModule } from 'devextreme-angular';
const exampleRoutes: Route[] = [
    {
        path     : '',
        component: RoomsComponent
    }
];

@NgModule({
    declarations: [
        RoomsComponent
    ],
    imports     : [
        DxDataGridModule,
        RouterModule.forChild(exampleRoutes)
    ]
})
export class RoomsModule
{
}
