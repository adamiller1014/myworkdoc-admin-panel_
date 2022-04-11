import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { FormsService } from 'app/core/api/forms.service';

@Component({
    selector: 'provider-form',
    templateUrl: './provider-form.component.html',
    //  encapsulation: ViewEncapsulation.None
})
export class ProviderFormComponent implements OnInit {
    form_id = null;
    form_types = []
    case_form_type_id = null;
    form_data = {
        "title": "",
        "assignedCompanyID": 0,
        "active": true,
        "hidden": false,
        "default": true,
        "viewmode": "Combined",
        "pages": new Array({
            title: `Page 1`,
            fields: [],
            active: true
        })
    };
    /**
     * Constructor
     */
    constructor(private _formsServices: FormsService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
    }


    /*


    name,address,joined_on,active

        */

    ngOnInit(): void {

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
            case_form_type_id: this.case_form_type_id

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
                    this.case_form_type_id = data.results.case_form_type_id


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
