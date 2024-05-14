import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsService } from 'app/core/api/forms.service';
import Swal from 'sweetalert2'
import { ListTypeComponent } from '../list-type/list-type.component';

@Component({
  selector: 'app-list-types',
  templateUrl: './list-types.component.html',
  styleUrls: ['./list-types.component.scss']
})
export class ListTypesComponent implements OnInit, AfterViewInit {
  
  items = []

    
    /**
     * Constructor
     */
    constructor(private _formsService: FormsService,
      private _formBuilder: FormBuilder,
      private _route: ActivatedRoute,
      private _matDialog: MatDialog,
      private _router: Router) {

    }

    ngOnInit(){
        
      this.getListTypes();
        
    }
    /**
     * After view init
     */

    ngAfterViewInit(): void {

    }
    
    
    onTabChanged(event){

    }
    editListItem(row){
        this.openListTypeDialog(row.data.id);
    }

    openListTypeDialog(listtype_id): void {
      const dialogRef = this._matDialog.open(ListTypeComponent, {
        data: {
          list_type_id: listtype_id
        }
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        this.getListTypes();
  
        if (result) {
         console.log('List Type Form Closed');
        }
      });
  
     }


    getListTypes(): void {
      this._formsService.getListTypes().subscribe((data) => {
          if (data.success) {
              console.log(data)
              this.items = data.results

          }
      })

    }    

   
  


}
