import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ProfilesComponent } from 'app/modules/admin/profiles/profiles.component';

import { DxButtonModule } from 'devextreme-angular';
import {
    DxDataGridComponent,
    DxDataGridModule,
    DxSelectBoxModule,
    DxCheckBoxModule
} from 'devextreme-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ProfileComponent } from './profile/profile.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { SharedModule } from 'app/shared/shared.module';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { fab } from '@fortawesome/free-brands-svg-icons';

import { fas } from '@fortawesome/pro-solid-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { far } from '@fortawesome/pro-regular-svg-icons';
import { fad } from '@fortawesome/pro-duotone-svg-icons';
import { fat } from '@fortawesome/pro-thin-svg-icons';


const exampleRoutes: Route[] = [
    {
        path: '',
        component: ProfilesComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'profile/:id',
        component: ProfileComponent
    }
];

@NgModule({
    declarations: [
        ProfilesComponent,
        ProfileComponent
    ],
    imports: [
        DxDataGridModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatAutocompleteModule,
        SharedModule,
        MatCheckboxModule,
        MatDatepickerModule, FontAwesomeModule,
        RouterModule.forChild(exampleRoutes)
    ]
})
export class ProfilesModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas, fab, fal, far, fad, fat);
      }
}
