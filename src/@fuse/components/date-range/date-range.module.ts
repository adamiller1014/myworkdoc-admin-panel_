import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FuseDateRangeComponent } from '@fuse/components/date-range/date-range.component';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { far } from '@fortawesome/pro-regular-svg-icons';
import { fad } from '@fortawesome/pro-duotone-svg-icons';
import { fat } from '@fortawesome/pro-thin-svg-icons';

@NgModule({
    declarations: [
        FuseDateRangeComponent
    ],
    imports     : [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatMomentDateModule, 
        FontAwesomeModule,
    ],
    exports     : [
        FuseDateRangeComponent
    ]
})
export class FuseDateRangeModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas, fab, fal, far, fad, fat);
    }
}