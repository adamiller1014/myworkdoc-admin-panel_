import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormsService } from 'app/core/api/forms.service';

@Component({
    selector: 'provider-forms',
    templateUrl: './provider-forms.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ProviderFormsComponent implements OnInit {

    /**
     * The component filter state
     */ 
    filterValue: any = null;
    filterStorageName: string = 'Provider-FormsFilter';

    forms = []

    /**
     * Constructor
     */
    constructor(private _formsService: FormsService,private _router: Router) {
    }
    ngOnInit(): void {
        this.getCompanies();

    }

    getCompanies() {
        this._formsService.getForms().subscribe(data => {
            console.log(data);
            if(data.success){
                this.forms = data.results;
            }
        })
    }

    gotoRow(row):void {
        this._router.navigate(['/forms/provider/form/', row.data.id]);
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
