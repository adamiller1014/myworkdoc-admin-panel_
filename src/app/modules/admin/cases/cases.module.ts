import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CasesComponent } from 'app/modules/admin/cases/cases.component';

import { DxButtonModule } from 'devextreme-angular';
import { DxDataGridComponent,
    DxDataGridModule,
    DxSelectBoxModule,
    DxCheckBoxModule } from 'devextreme-angular';
const exampleRoutes: Route[] = [
    {
        path     : '',
        component: CasesComponent
    }
];

@NgModule({
    declarations: [
        CasesComponent
    ],
    imports     : [
        DxDataGridModule,
        RouterModule.forChild(exampleRoutes)
    ]
})
export class CasesModule
{
}
