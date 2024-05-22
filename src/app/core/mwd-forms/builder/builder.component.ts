import { AfterViewChecked, AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormsService } from 'app/core/api/forms.service';
import Swal from 'sweetalert2'

export interface DialogData {
  field: {
    id: '',
    title: '',
    type: '',
    shortTitle: '',
    description: '',
    required: false,
    settings: any
  },
  form_data: any,
  activePage: number,
  data_sets:any
}

@Component({
  selector: 'mwd-form-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class MWDFormBuilderComponent {
  @Output() public onSaveEvent: EventEmitter<any>;
  @Input() public showPreviewButton: boolean = false;
  @Input() public showDefaultCheckbox: boolean = false;
  @Input() public data_sets: any = [];
  @Input() public form_data: any = {
    "title": "",
    "assignedCompanyID": 0,
    "active": true,
    "default": false,
    "pages": new Array()
  };
  @Input() public disableSaveButton: boolean = false;

  constructor(public dialog: MatDialog, private router: Router) {
    this.onSaveEvent = new EventEmitter();

    if (!this.form_data.pages[0]) {
      this.addPage()
    }
  }

  activePage = 0;


  addPage() {
    this.form_data.pages.push({
      title: `Page ${this.form_data.pages.length + 1}`,
      fields: [],
      active: true
    });
  }
  gotoPage(index: number) {
    this.activePage = index
  }
  deletePage(index: number) {

    if (confirm('Are you sure you want to delete this page and all fields?')) {
      // Save it!
      this.form_data.pages.splice(Number(index), 1)
    } else {
      // Do nothing!
    }

  }

  openDialog(type: any, field: any) {


    switch (type) {
      case 'new':
        const dialogRef = this.dialog.open(DialogDataExampleDialog, {
          data: {

          }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            switch (result) {
              case 'select':
                this.form_data.pages[this.activePage].fields.push({
                  "id": Math.random().toString(36).substr(2, 9),
                  "type": "select",
                  "title": "New Select",
                  "description": "",
                  "required": false,
                  "shortTitle": "",
                  "settings": {
                    "style": "dropdown",
                    "multiple": false,
                    "source":"customFormBuilderList",
                    "items": [
                    ],
                    "defaultIds": [],
                  },
                  "hidden": false,
                  "conditions": {
                    "condition": "and",
                    "rules": []
                  }
                })
                break;
              case 'cselect':
                this.form_data.pages[this.activePage].fields.push({
                  "id": Math.random().toString(36).substr(2, 9),
                  "type": "cselect",
                  "title": "New Customer List",
                  "description": "",
                  "required": false,
                  "shortTitle": "",
                  "settings": {
                    "customerListType": "business-line",
                    "source": "customFormBuilderList"
                  },
                  "hidden": false,
                  "conditions": {
                    "condition": "and",
                    "rules": []
                  }
                })
                break;  
              case 'dselect':
                this.form_data.pages[this.activePage].fields.push({
                  "id": Math.random().toString(36).substr(2, 9),
                  "type": "dselect",
                  "title": "New Data List",
                  "description": "",
                  "required": false,
                  "shortTitle": "",
                  "settings": {
                    "listType": 'global',
                    "listId": 0,                    
                    "multiple": false,
                    "source": "customFormBuilderList"
                  },
                  "hidden": false,
                  "conditions": {
                    "condition": "and",
                    "rules": []
                  }
                })
                break;                   
              case 'checkbox':
                this.form_data.pages[this.activePage].fields.push({
                  "id": Math.random().toString(36).substr(2, 9),
                  "type": "checkbox",
                  "title": "New Checkbox",
                  "description": "",
                  "required": false,
                  "shortTitle": "",
                  "settings": {
                    "defaultValue": false
                  },
                  "hidden": false,
                  "conditions": {
                    "condition": "and",
                    "rules": []
                  }
                })
                break;
              case 'header':
                this.form_data.pages[this.activePage].fields.push({
                  "id": Math.random().toString(36).substr(2, 9),
                  "type": "header",
                  "title": "New Header",
                  "description": "",
                  "shortTitle": "",
                  "settings": {
                  },
                  "hidden": false,
                  "conditions": {
                    "condition": "and",
                    "rules": []
                  }
                })
                break;
              case 'input':
                this.form_data.pages[this.activePage].fields.push({
                  "id": Math.random().toString(36).substr(2, 9),
                  "type": "input",
                  "title": "New Input",
                  "description": "",
                  "required": false,
                  "shortTitle": "",
                  "settings": {
                    "multiLine": false,
                    "type":'text'
                  },
                  "hidden": false,
                  "conditions": {
                    "condition": "and",
                    "rules": []
                  }
                })
                break;
              case 'rich-input':
                this.form_data.pages[this.activePage].fields.push({
                  "id": Math.random().toString(36).substr(2, 9),
                  "type": "rich-input",
                  "title": "New Input",
                  "description": "",
                  "required": false,
                  "shortTitle": "",
                  "settings": {
                    "multiLine": true,
                  },
                  "hidden": false,
                  "conditions": {
                    "condition": "and",
                    "rules": []
                  }
                })
                break;
              case 'file-uploader':
                this.form_data.pages[this.activePage].fields.push({
                  "id": Math.random().toString(36).substr(2, 9),
                  "type": "file-uploader",
                  "title": "Upload",
                  "description": "",
                  "required": false,
                  "shortTitle": "",
                  "settings": {

                  },
                  "hidden": false,
                  "conditions": {
                    "condition": "and",
                    "rules": []
                  }
                })
                break;
              case 'signature':
                this.form_data.pages[this.activePage].fields.push({
                  "id": Math.random().toString(36).substr(2, 9),
                  "type": "signature",
                  "title": "Signature",
                  "description": "",
                  "required": false,
                  "shortTitle": "",
                  "settings": {

                  },
                  "hidden": false,
                  "conditions": {
                    "condition": "and",
                    "rules": []
                  }
                })
                break;
              case 'date-time':
                this.form_data.pages[this.activePage].fields.push({
                  "id": Math.random().toString(36).substr(2, 9),
                  "type": "date-time",
                  "title": "New Date",
                  "description": "",
                  "required": false,
                  "shortTitle": "",
                  "settings": {
                    "mode": "date",
                  },
                  "hidden": false,
                  "conditions": {
                    "condition": "and",
                    "rules": []
                  }
                })
                break;
              case 'description':
                this.form_data.pages[this.activePage].fields.push({
                  "id": Math.random().toString(36).substr(2, 9),
                  "type": "description",
                  "title": "Description",
                  "description": ``,
                  "shortTitle": "",
                  "settings": {
                  },
                  "hidden": false,
                  "conditions": {
                    "condition": "and",
                    "rules": []
                  }
                })
                break;
            }

          }
          // this.animal = result;
        });
        break;

      case 'edit':
        const editDialogRef = this.dialog.open(DialogDataEditDialog, {
          height: '85%',
          width: '95%',
          data: {
            field,
            form_data: this.form_data,
            activePage: this.activePage,
            data_sets: this.data_sets
          }
        });
        editDialogRef.afterClosed().subscribe(result => {

          if (result) {
            var replaceIndex = this.form_data.pages[this.activePage].fields.map((item: { id: any; }) => item.id).indexOf(result.id);
            this.form_data.pages[this.activePage].fields[replaceIndex] = JSON.parse(JSON.stringify(result))

            console.log(result)
          }

        });
        break;



    }


  }

  moveField(itemIndex: Number, direction: any) {

    let newIndex: Number = 0;
    switch (direction) {
      case 'up':
        newIndex = Number(itemIndex) - 1;
        break;
      case 'down':
        newIndex = Number(itemIndex) + 1;

        break;

    }

    const changeIndex = (arrayToUpdate: any[], elementToReposition: number, newIndex: number) => {
      //   console.log(arrayToUpdate[elementToReposition])
      if (newIndex > arrayToUpdate.length - 1) {
        //   console.log('Array index out of bounds');
        return null;
      }

      // //  arrayToUpdate.splice(elementToReposition, 1);
      //   arrayToUpdate.splice(elementToReposition, newIndex);
      //   return arrayToUpdate;
      if (newIndex >= arrayToUpdate.length) {
        var k = newIndex - arrayToUpdate.length + 1;
        while (k--) {
          arrayToUpdate.push(undefined);
        }
      }
      arrayToUpdate.splice(newIndex, 0, arrayToUpdate.splice(elementToReposition, 1)[0]);
      return arrayToUpdate; // for testing
    }

    changeIndex(this.form_data.pages[this.activePage].fields, Number(itemIndex), Number(newIndex))
    // console.log({
    //   index: itemIndex,
    //   direction: direction,
    //   newIndex: newIndex,
    //   test: test,

    // })


  }


  deleteField(itemIndex: Number,) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.form_data.pages[this.activePage].fields.splice(Number(itemIndex), 1)
      }
    })
  }

  save() {
    this.onSaveEvent.emit(this.form_data);

  }
  preview() {
    localStorage.setItem('formPreview', JSON.stringify(this.form_data))
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/viewer`])
    );

    window.open(url, '_blank');
  }

}


@Component({
  selector: 'new-field-dialog',
  templateUrl: './new-field-dialog.html',
})
export class DialogDataExampleDialog {
  fieldType = 'select';
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    //  console.log(data)
  }
}

@Component({
  selector: 'edit-field-dialog',
  templateUrl: './edit-field-dialog.html',
})
export class DialogDataEditDialog implements AfterViewInit {

  query = {
    condition: 'and',
    rules: [

    ]
  };

  config = {
    fields: {

    }
  };
  copiedForm = JSON.parse(JSON.stringify(this.data.form_data));
  copiedField = JSON.parse(JSON.stringify(this.data.field));




  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private _formsService: FormsService,  public dialogRef: MatDialogRef<DialogDataEditDialog>) {

    //console.log(this.copiedForm)
    
    var removeIndex = this.copiedForm.pages[this.data.activePage].fields.map((item: { id: any; }) => item.id).indexOf(this.copiedField.id);
    this.copiedForm.pages[this.data.activePage].fields.splice(removeIndex, 1);

    // console.log(this.copiedForm)
    var fields: any = {


    };

    this.copiedForm.pages[this.data.activePage].fields.forEach((element: any) => {
      console.log(element)
      var options: any = []
      element.settings.items?.forEach((item: any) => {
        // console.log(item)
        options.push({
          name: item.label,
          value: item.value
        })
      });

      switch (element.type) {
        case 'select':
          if (element.settings.multiple) {

            fields[element.id] = {
              name: element.title,
              type: 'multiselect',
              options: options,
              operators: ['in', 'not in']
            }
          } else {
            fields[element.id] = {
              name: element.title,
              type: 'category',
              options: options
            }
          }

          break;
        case 'checkbox':
          fields[element.id] = {
            name: element.title,
            type: 'boolean',
            options: options
          }
          break;

        default:
          break;
      }




    });

    this.config.fields = fields;
    this.query = this.copiedField.conditions;

  }
  datalists = [];


  ngAfterViewInit(): void {
    if (this.copiedField.type === 'dselect')
    {
      this.updateDataListType(this.data.field.settings.listType);
    }
  }

  updateDataListType(selectedValue: string) {
    switch (selectedValue) 
    {
      case "global":
        this.getLists();
        break;
    }
    // You can perform additional logic here if needed
  }

  getLists() {

    this._formsService.getLists().subscribe((data) => {
        if (data.success) {

            data.results.forEach(list => {
                if(!list.active)
                  list.name = list.name.concat(' (Disabled)')
            });
            
            this.datalists = data.results

        }
    })
}


  get config1() {


    // console.log(fields)


    return {
      fields: {
        // age: {name: 'Age', type: 'number'},
        gender: {
          name: 'Gender',
          type: 'category',
          options: [
            { name: 'Male', value: 'm' },
            { name: 'Female', value: 'f' }
          ]
        }
      }
    }
  }

  isConfigEmpty() {
    return Object.keys(this.config.fields).length === 0;
  }

  newItem() {
    this.copiedField.settings.items.push({
      id: Math.random().toString(36).substr(2, 9),
      label: '',
      value: ''
    })
  }
  moveItem(itemIndex: Number, direction: any) {

    let newIndex: Number = 0;
    switch (direction) {
      case 'up':
        newIndex = Number(itemIndex) - 1;
        break;
      case 'down':
        newIndex = Number(itemIndex) + 1;

        break;

    }

    const changeIndex = (arrayToUpdate: any[], elementToReposition: number, newIndex: number) => {
      //   console.log(arrayToUpdate[elementToReposition])
      if (newIndex > arrayToUpdate.length - 1) {
        //   console.log('Array index out of bounds');
        return null;
      }


      if (newIndex >= arrayToUpdate.length) {
        var k = newIndex - arrayToUpdate.length + 1;
        while (k--) {
          arrayToUpdate.push(undefined);
        }
      }
      arrayToUpdate.splice(newIndex, 0, arrayToUpdate.splice(elementToReposition, 1)[0]);
      return arrayToUpdate; // for testing
    }

    let test = changeIndex(this.copiedField.settings.items, Number(itemIndex), Number(newIndex))
    console.log({
      index: itemIndex,
      direction: direction,
      newIndex: newIndex,
      test: test,

    })


  }
  deleteItem(itemIndex: Number,) {
    this.copiedField.settings.items.splice(Number(itemIndex), 1)
  }
  save() {
    let process = true;
    let title = '';
    switch (this.copiedField.type)
    {
      case 'dselect':
        if (!this.copiedField.settings.listId) {
          process = false;
          title = "Data List";
        }
        break;
      case 'cselect':
        if (!this.copiedField.customerListType)
        {
          title = "Customer List";
          process = false;
        }
        break;
      default:
        break;
    }
    
    if (process)
    {
      this.copiedField.conditions = this.query;
      this.dialogRef.close(this.copiedField)
    }
    else {
      Swal.fire({
        title: title,
        text: "Please Choose a list item before saving",
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      });

    }
    //  console.log(this.copiedField)
  }
}