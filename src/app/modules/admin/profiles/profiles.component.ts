import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CasesService } from 'app/core/api/cases.service';
import { ProfileService } from 'app/core/api/profile.service';

@Component({
    selector: 'profiles',
    templateUrl: './profiles.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ProfilesComponent implements OnInit {


    profiles = [];
    /**
     * Constructor
     */
    constructor(private _profileService: ProfileService,
        private _router: Router) {
    }
    ngOnInit(): void {
        this.getProfiles();

    }

    getProfiles(): void {
        this._profileService.getProfiles(null).subscribe((data) => {
            console.log(data);
            if(data.success){
                this.profiles = data.results;
            }
        });
    }
    gotoRow(row:any):void {
        this._router.navigate(['/profiles/profile/', row.data.id]);
    }
}
