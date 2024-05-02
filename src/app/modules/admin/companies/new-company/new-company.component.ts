import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CompaniesService } from 'app/core/api/companies.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
    selector: 'new-company',
    templateUrl: './new-company.component.html',
    //  encapsulation: ViewEncapsulation.None
})
export class NewCompanyComponent implements OnInit {
    companyForm: FormGroup;
    company_id = null;

    /**
     * Constructor
     */
    constructor(private _companiesServices: CompaniesService,
        private _formBuilder: FormBuilder,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
    }


    /*


    name,address,joined_on,active

        */

    ngOnInit(): void {
        this.companyForm = this._formBuilder.group({
            name: [''],
            address: [''],
            logo: [''],
            settings: [''],
            joined_on: [new Date()],
            active: [true],
            case_management_enabled: [false]
      

        });
        this._route.params.subscribe(params => {
            if (params['id']) {
                this.company_id = params['id'];
                this.getCompany(params['id']);
            }
        });
    }

    onSubmit(): void {
        let companyData = {
            name: this.companyForm.value.name,
            address: this.companyForm.value.address,
            joined_on: new Date(this.companyForm.value.joined_on).toLocaleDateString(),
            settings: this.companyForm.value.settings,
            active: this.companyForm.value.active,
            case_management_enabled: this.companyForm.value.case_management_enabled
            
        }
        if(!this.company_id){
            this._companiesServices.newCompany(companyData).subscribe((data)=>{
                if(data.success){
    
                    Swal.fire({
                        icon: 'success',
                        title:  companyData.name +' added',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      this._router.navigate(['companies']);
                }
            })
        }else{
            this._companiesServices.updateCompany(this.company_id,companyData).subscribe((data)=>{
                if(data.success){
    
                    Swal.fire({
                        icon: 'success',
                        title:  data.msg,
                        showConfirmButton: false,
                        timer: 1500
                      })
                      this._router.navigate(['companies']);
                }
            })
        }
       

    }

    getCompany(id:any): void {
        this._companiesServices.getCompany(id).subscribe((data) => {
            if (data.success) {
                console.log(data)
        
                this.companyForm.get('name').setValue(data.results.name);
                this.companyForm.get('address').setValue(data.results.address);
                this.companyForm.get('logo').setValue(data.results.logo);
                this.companyForm.get('joined_on').setValue(data.results.joined_on);
                this.companyForm.get('settings').setValue(data.results.settings);
                this.companyForm.get('active').setValue(data.results.active);
                this.companyForm.get('case_management_enabled').setValue(data.results.case_management_enabled);
            }
        })
    }
  
}
