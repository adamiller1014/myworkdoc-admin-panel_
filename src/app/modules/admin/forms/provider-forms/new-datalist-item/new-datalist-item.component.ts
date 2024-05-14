import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsService } from 'app/core/api/forms.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-datalist-item',
  templateUrl: './new-datalist-item.component.html',
  styleUrls: ['./new-datalist-item.component.scss']
})
export class NewDatalistItemComponent implements OnInit {

  datalistItemForm: FormGroup;
  datalistItem_id = null;
  datalist_id = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _formsService: FormsService,
  private _formBuilder: FormBuilder,public dialogRef: MatDialogRef<NewDatalistItemComponent>) { }


  ngOnInit(): void {
    
    console.log('init datalist item form');

    this.datalist_id = this.data.datalist_id;
    this.datalistItem_id = this.data.datalistItem_id;

    this.datalistItemForm = this._formBuilder.group({
      key: [''],
      value: [''],
      datalist_id: [this.datalist_id], 
      active: [true],

    });

    

    if (this.data.datalistItem_id !== 'new')
    {
      
      this._formsService.getListItem(this.datalist_id, this.data.datalistItem_id).subscribe((data) => {
        if (data.success) {
            console.log(data)

            this.datalistItemForm.get('key').setValue(data.results.key);
            this.datalistItemForm.get('value').setValue(data.results.value);
            this.datalistItemForm.get('active').setValue(data.results.active);

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
    let datalistItemData = {
        key: this.datalistItemForm.value.key,
        value: this.datalistItemForm.value.value,
        active: this.datalistItemForm.value.active,
        
    }
    if(this.datalistItem_id === 'new'){
        this._formsService.newDataItemlist(this.datalist_id, datalistItemData).subscribe((data)=>{
            if(data.success){

                Swal.fire({
                    icon: 'success',
                    title:  datalistItemData.key +' added',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  this.closeDialog();
            }
        })
    }else{
        this._formsService.updateDataItemlist(this.datalistItem_id, this.datalist_id, datalistItemData).subscribe((data)=>{
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
