import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsService } from 'app/core/api/forms.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list-type',
  templateUrl: './list-type.component.html',
  styleUrls: ['./list-type.component.scss']
})
export class ListTypeComponent implements OnInit {

  listTypeForm: FormGroup;
  list_type_id = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _formsService: FormsService,
  private _formBuilder: FormBuilder,public dialogRef: MatDialogRef<ListTypeComponent>) { }


  ngOnInit(): void {
    
    console.log('init list type form');

    this.list_type_id = this.data.list_type_id;

    this.listTypeForm = this._formBuilder.group({
      name: [''],
      active: [true],

    });


    if (this.data.list_type_id !== 'new')
    {
      
      this._formsService.getListType(this.list_type_id).subscribe((data) => {
        if (data.success) {
            console.log(data)

            this.listTypeForm.get('name').setValue(data.results.name);
            this.listTypeForm.get('active').setValue(data.results.active);

        }
    })
    }
  }

  parseJSON(value: string): string {
    return JSON.stringify(value);
  }


  
  closeDialog(): void {
    console.log('CLOSE ME');
    this.dialogRef.close();
  }

  onSubmit(): void {
    let listTypeData = {
        name: this.listTypeForm.value.name,
        active: this.listTypeForm.value.active,
        
    }

    if(this.list_type_id === 'new'){
        this._formsService.newListType(listTypeData).subscribe((data)=>{
            if(data.success){

                Swal.fire({
                    icon: 'success',
                    title:  listTypeData.name +' added',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  this.closeDialog();
            }
        })
    }else{
        this._formsService.updateListType(this.list_type_id, listTypeData).subscribe((data)=>{
            if(data.success){
                Swal.fire({
                    icon: 'success',
                    title:  data.msg,
                    showConfirmButton: false,
                    timer: 1500
                  })
                  this.closeDialog();
            }
        })
    }
  }
}
