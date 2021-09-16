import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CasesService } from 'app/core/api/cases.service';

@Component({
    selector: 'cases',
    templateUrl: './cases.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CasesComponent implements OnInit {
  

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
}
