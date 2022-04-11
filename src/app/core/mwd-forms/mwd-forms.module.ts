import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MWDFormViewerComponent } from './viewer/viewer.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


import { RouterModule } from '@angular/router';
import { SignaturePadModule } from './libs/signature-pad/angular2-signaturepad.module';
import { QuillModule } from 'ngx-quill';
import { DialogDataEditDialog, DialogDataExampleDialog, MWDFormBuilderComponent } from './builder/builder.component';
import { Angular2QueryBuilderModule } from './builder/lib/angular2-query-builder.module'


@NgModule({
  declarations: [

    MWDFormViewerComponent,
    MWDFormBuilderComponent,
    DialogDataExampleDialog,
    DialogDataEditDialog
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    FlexLayoutModule,
    MatDialogModule,
    FormsModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,

    RouterModule,
    SignaturePadModule,
    QuillModule.forRoot(),
    Angular2QueryBuilderModule

  ],
  providers: [],
  bootstrap: [],
  exports:[MWDFormViewerComponent,MWDFormBuilderComponent]
})
export class MWDFormsModule { }
