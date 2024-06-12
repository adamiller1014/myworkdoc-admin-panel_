import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CasesService } from 'app/core/api/cases.service';

@Component({
    selector: 'cases',
    templateUrl: './cases.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CasesComponent implements OnInit {
  
    /**
     * The component filter state
     */ 
    filterValue: any = null;
    filterStorageName: string = 'CasesFilter';

    cases = []

    /**
     * Constructor
     */
    constructor(private _casesServices: CasesService) {
    }
    ngOnInit(): void {
        this.getCompanies();
    }

    getCompanies() {
        this._casesServices.getCases('all',30).subscribe(data => {
            console.log(data);
            if(data.success){
                this.cases = data.results;
            }
        })
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
