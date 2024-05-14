import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsService } from 'app/core/api/forms.service';

@Component({
  selector: 'app-datalists',
  templateUrl: './datalists.component.html',
  styleUrls: ['./datalists.component.scss']
})
export class DatalistsComponent implements OnInit, AfterViewInit {

  forms = []

    
    /**
     * Constructor
     */
    constructor(private _formsService: FormsService,private _router: Router) {

    }

    ngOnInit(){
        
        this.getLists()
        
    }
    /**
     * After view init
     */

    ngAfterViewInit(): void {

    }
    
    
    onTabChanged(event){

    }
    editList(row){
        this._router.navigate(['/forms/datalists/',row.data.id]);
    }


    getLists() {
        this._formsService.getLists().subscribe((data) => {
            if (data.success) {

                data.results.forEach(list => {
                    if(!list.active)
                      list.name = list.name.concat(' (Disabled)')
                });
                
                this.forms = data.results
                

            }
        })
    }


}
