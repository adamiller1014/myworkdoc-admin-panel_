import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RoomsService } from 'app/core/api/rooms.service';

@Component({
    selector: 'rooms',
    templateUrl: './rooms.component.html',
    encapsulation: ViewEncapsulation.None
})
export class RoomsComponent implements OnInit {
  
    /**
     * The component filter state
     */ 
    filterValue: any = null;
    filterStorageName: string = 'RoomsFilter';

    rooms = []

    /**
     * Constructor
     */
    constructor(private _roomsServices: RoomsService) {
    }
    ngOnInit(): void {
        this.getCompanies();

    }

    getCompanies() {
        this._roomsServices.getRooms().subscribe(data => {
            console.log(data);
            if(data.success){
                this.rooms = data.results;
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
