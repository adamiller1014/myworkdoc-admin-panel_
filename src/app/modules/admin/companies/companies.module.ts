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

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { far } from '@fortawesome/pro-regular-svg-icons';
import { fad } from '@fortawesome/pro-duotone-svg-icons';
import { fat } from '@fortawesome/pro-thin-svg-icons';

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
        FontAwesomeModule,
    ]
})
export class CompaniesModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas, fab, fal, far, fad, fat);
    }
}
