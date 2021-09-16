import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CompaniesComponent } from 'app/modules/admin/companies/companies.component';
import { MatButtonModule } from '@angular/material/button';
import { DxDataGridModule } from 'devextreme-angular';

import { NewCompanyComponent } from './new-company/new-company.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { SharedModule } from 'app/shared/shared.module';

const exampleRoutes: Route[] = [
    {
        path: '',
        component: CompaniesComponent
    },
    {
        path: 'new-company',
        component: NewCompanyComponent
    },
    {
        path: 'company/:id',
        component: NewCompanyComponent
    }
];

@NgModule({
    declarations: [
        CompaniesComponent,
        NewCompanyComponent
    ],
    imports: [
        DxDataGridModule,
        
        RouterModule.forChild(exampleRoutes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatAutocompleteModule,
        SharedModule,
        MatCheckboxModule,
        MatDatepickerModule,
    ]
})
export class CompaniesModule {
}
