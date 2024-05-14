import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DxDataGridModule } from 'devextreme-angular';

import { ProviderFormsComponent } from './provider-forms/provider-forms.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { SharedModule } from 'app/shared/shared.module';
import { ProviderFormComponent } from './provider-forms/form/provider-form.component';
import { MWDFormsModule } from 'app/core/mwd-forms/mwd-forms.module';
import { ListTypeComponent } from './provider-forms/list-type/list-type.component';
import { NewDatalistItemComponent } from './provider-forms/new-datalist-item/new-datalist-item.component';

const exampleRoutes: Route[] = [
    {
        path: 'provider',
        component: ProviderFormsComponent
    },
    {
        path: 'provider/form/:id',
        component: ProviderFormComponent
    },{
        path: 'provider/form',
        component: ProviderFormComponent
    },

];

@NgModule({
    declarations: [
        ProviderFormsComponent,
        ProviderFormComponent,NewDatalistItemComponent, ListTypeComponent
        
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
        MWDFormsModule
    ]
})
export class FormsModule {
}
