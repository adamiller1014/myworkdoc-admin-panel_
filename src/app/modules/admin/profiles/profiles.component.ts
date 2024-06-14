import { Component, OnInit, AfterViewInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'app/core/api/profile.service';

@Component({
    selector: 'profiles',
    templateUrl: './profiles.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ProfilesComponent implements OnInit, AfterViewInit, OnDestroy {

    /**
     * The component filter state
     */ 
    filterValue: any = null;
    filterStorageName: string = 'ProfilesFilter';

    profiles = [];

    /**
     * Constructor
     */
    constructor(private _profileService: ProfileService, private _router: Router) {}

    ngOnInit(): void {
        this.getProfiles();
    }

    getProfiles(): void {
        this._profileService.getProfiles(null).subscribe((data) => {
            console.log(data);
            if (data.success) {
                this.profiles = data.results;
            }
        });
    }

    gotoRow(row: any): void {
        this._router.navigate(['/profiles/profile/', row.data.id]);
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {
        if (sessionStorage.getItem(this.filterStorageName)) {
            this.filterValue = JSON.parse(sessionStorage.getItem(this.filterStorageName));
        }
    }

    /**
     * Before Leaving the page
     */
    ngOnDestroy() {
        sessionStorage.setItem(this.filterStorageName, JSON.stringify(this.filterValue));
    }
}
