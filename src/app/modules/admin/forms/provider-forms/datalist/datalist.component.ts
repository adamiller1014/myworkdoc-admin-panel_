import { AfterViewInit, Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsService } from 'app/core/api/forms.service';
import Swal from 'sweetalert2'
import { NewDatalistItemComponent } from '../new-datalist-item/new-datalist-item.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';



@Component({
  selector: 'app-datalists',
  templateUrl: './datalist.component.html',
  styleUrls: ['./datalist.component.scss']
})
export class DatalistComponent implements OnInit, AfterViewInit {
  datalistForm: FormGroup;

  datalist_id = null;
  datalist_name = null;
  code = null;
  isActive = null;
  list_type_id = null;
  selectedListType = null;

  items = [];
  listTypes = [];
    
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
        
      this.datalistForm = this._formBuilder.group({
        name: [''],
        code: [''],
        active: [true],
        list_type_id: [null, Validators.required],


    });

    this.getListTypes();

        this._route.params.subscribe(params => {
          if (params['id']) {
              this.datalist_id = params['id'];
              if (params['id'] !== 'new')
              {
                this.getDatalist(params['id']);
                this.getDatalistItems(params['id']);
              }
          }
      });        
        
    }
    /**
     * After view init
     */

    ngAfterViewInit(): void {

    }
    
    
    onTabChanged(event){

    }
    editListItem(row){
        this.openDatalistItem(row.data.id);
    }


    getDatalist(id:any): void {
      this._formsService.getList(id).subscribe((data) => {
          if (data.success) {
              console.log(data)
              this.datalist_name = data.results.name; 
              this.code = data.results.code;
              this.isActive = data.results.active; 
              this.list_type_id = data.results.list_type_id; 
              this.datalistForm.get('name').setValue(data.results.name);
              this.datalistForm.get('code').setValue(data.results.code);
              this.datalistForm.get('active').setValue(data.results.active);
              this.datalistForm.get('list_type_id').setValue(data.results.list_type_id);


          }
      })

    }    

    getListTypes(): void {
      this._formsService.getListTypes().subscribe((data) => {
          if (data.success) {
              console.log(data)
              this.listTypes = data.results

          }
      })

    }   

    getDatalistItems(id:any): void {
      this._formsService.getListItems(id).subscribe((data) => {
          if (data.success) {
              console.log(data)
              this.items = data.results

          }
      })

    }    

    changeListType(value) {
      this.list_type_id = value;
    }

    onSubmit(): void {

      if (this.list_type_id === 0)
        {
          this.list_type_id = null;
        }
      let datalistData = {
          name: this.datalistForm.value.name,
          code: this.datalistForm.value.code,
          active: this.datalistForm.value.active,
          list_type_id: this.list_type_id
      }
      

      if(this.datalist_id === 'new'){
          this._formsService.newDatalist(datalistData).subscribe((data)=>{
              if(data.success){
  
                  Swal.fire({
                      icon: 'success',
                      title:  datalistData.name +' added',
                      showConfirmButton: false,
                      timer: 1500
                    })
                    this._router.navigate(['/forms/datalists']);
              }
          })
      }else{
          this._formsService.updateDatalist(this.datalist_id,datalistData).subscribe((data)=>{
              if(data.success){
                  Swal.fire({
                      icon: 'success',
                      title:  data.msg,
                      showConfirmButton: false,
                      timer: 1500
                    })
                    this._router.navigate(['/forms/datalists']);
              }
          })
      }
     

  }

  openDatalistItem(datalistItem_id): void {
    const dialogRef = this._matDialog.open(NewDatalistItemComponent, {
      data: {
        datalist_id: this.datalist_id,
        datalistItem_id: datalistItem_id
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getDatalistItems(this.datalist_id);

      if (result) {
       console.log('Datalist Item Form Closed');
      }
    });

   }

}
