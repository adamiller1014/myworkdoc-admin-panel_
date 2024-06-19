import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { FormsService } from 'app/core/api/forms.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'provider-form',
    templateUrl: './provider-form.component.html',
    //  encapsulation: ViewEncapsulation.None
})
export class ProviderFormComponent implements OnInit {
    form_id = null;
    form_types = []
    form_data = {
        "title": "",
        "assignedCompanyID": 0,
        "active": true,
        "hidden": false,
        "default": true,
        "type": "triage",
        "viewmode": "Combined",
        "pages": new Array({
            title: `Page 1`,
            fields: [],
            active: true
        })
    };
    providerForm: FormGroup;
    secondForm: FormGroup;
    /**
     * Constructor
     */
    constructor(private _formsServices: FormsService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _formBuilder: FormBuilder
    ) {
    }


    /*


    name,address,joined_on,active

        */

    ngOnInit(): void {
        this.providerForm = this._formBuilder.group({
            case_form_type_id     : [null, [Validators.required]],
        });

        this.secondForm = this._formBuilder.group({
            type: ['', Validators.required]
          });

        this._route.params.subscribe(params => {
            if (params['id']) {
                this.form_id = params['id'];
                this.getCaseForm(params['id']);
            }
        });
        this.getCaseFormTypes()
    }






    onSubmit(form_data: any): void {
        let formInfo = {
            form_info: form_data,
            active: form_data.active,
            type: this.secondForm.get('type').value,
            case_form_type_id: this.providerForm.get('case_form_type_id').value
        }
        if (!this.form_id) {
            this._formsServices.newForm(formInfo).subscribe((data) => {
                if (data.success) {

                    Swal.fire({
                        icon: 'success',
                        title: form_data.title + ' added',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this._router.navigate(['forms/provider']);
                }
            })
        } else {
            console.log('updating')
            this._formsServices.updateForm(this.form_id,formInfo).subscribe((data) => {
                if (data.success) {

                    Swal.fire({
                        icon: 'success',
                        title: form_data.title + ' updated',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this._router.navigate(['forms/provider']);
                }else{
                    console.log(data)
                }
            })
        }


    }

    getCaseForm(id: any): void {
        this._formsServices.getCaseForm(id).subscribe((data) => {
            if (data.success) {
                console.log(data)
                if (data.results.form_info)
                    this.form_data = data.results.form_info
                    this.providerForm.get('case_form_type_id').setValue(data.results.case_form_type_id);
                    this.secondForm.get('type').setValue(data.results.type);


            }
        })
    }
    getCaseFormTypes(): void {
        this._formsServices.getCaseFormTypes().subscribe((data) => {
            if (data.success) {
                console.log(data)
                if (data.results)
                    this.form_types = data.results

            }
        })
    }

    

}
