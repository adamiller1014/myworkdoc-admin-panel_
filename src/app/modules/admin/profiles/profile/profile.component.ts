import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CasesService } from 'app/core/api/cases.service';
import { CompaniesService } from 'app/core/api/companies.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RolesService } from 'app/core/api/roles.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProfileService } from 'app/core/api/profile.service';
import Swal from 'sweetalert2'

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    //  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
    accountForm: FormGroup;

    companies = [];

    profile_types = [
        {
            id: 1,
            type: 'Admin'
        }, {
            id: 2,
            type: 'Provider'
        },
        {
            id: 3,
            type: 'End User'
        }
    ]
    roles = [];
    profile_id = null;
    /**
     * Constructor
     */
    constructor(private _companiesServices: CompaniesService,
        private _formBuilder: FormBuilder,
        private _rolesService: RolesService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _profileService: ProfileService
    ) {
    }


    ngOnInit(): void {
        this.accountForm = this._formBuilder.group({
            first_name: ['',Validators.required],
            last_name: ['',Validators.required],
            title: [''],
            ein: ['',Validators.required],
            role_id: [{ value: null, disabled: true },Validators.required],
            company_id: [null,Validators.required],
            profile_type_id: [null,Validators.required],
            email: ['', [Validators.email,Validators.required]],
            cell_number: ['',[Validators.required, Validators.pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)]],
            home_address: [''],
            active: [true],
            hire_date: [new Date()],
            terminated_date: [null],
            birth_date: [null]

        });
        this._route.params.subscribe(params => {
            if (params['id']) {
                this.profile_id = params['id'];
                this.getProfile(params['id']);
            }
        });

        this.getCompanies();

    }

    onSubmit(): void {
        console.log(this.accountForm)
    }
    choseCompany(company_id: any): void {
        this._rolesService.getAllRolesByCompany(company_id).subscribe((data) => {
            if (data.success) {
                this.roles = data.results
                this.accountForm.get('role_id').enable();
                this.accountForm.get('role_id').setValue('');

            }
        })


    }

    getCompanies(): void {
        this._companiesServices.getCompanies(true).subscribe(data => {
            if (data.success) {
                this.companies = data.results;
            }
        })
    }
    getProfile(id): void {
        this._profileService.getProfile(id).subscribe((data) => {
            if (data.success) {
                this._rolesService.getAllRolesByCompany(data.results.company_id).subscribe((data2) => {
                    if (data2.success) {
                        this.roles = data2.results
                        this.accountForm.get('role_id').enable();

                        this.accountForm.get('role_id').setValue(data.results.role_id);
                    }
                })

                this.accountForm.get('company_id').setValue(data.results.company_id);
                this.accountForm.get('profile_type_id').setValue(Number(data.results.profile_type_id));
                this.accountForm.get('first_name').setValue(data.results.first_name);
                this.accountForm.get('last_name').setValue(data.results.last_name);
                this.accountForm.get('email').setValue(data.results.email);
                this.accountForm.get('cell_number').setValue(data.results.cell_number);
                this.accountForm.get('ein').setValue(data.results.ein);
                this.accountForm.get('title').setValue(data.results.title);
                this.accountForm.get('hire_date').setValue(data.results.hire_date);
                this.accountForm.get('birth_date').setValue(data.results.birth_date);
                this.accountForm.get('terminated_date').setValue(data.results.terminated_date);
                this.accountForm.get('home_address').setValue(data.results.home_address);
                this.accountForm.get('active').setValue(data.results.active);

                console.log(data.results)
            }
        })
    }

    submitNew(): void {
        let submitData = {
            ein: this.accountForm.get('ein').value,
            first_name: this.accountForm.get('first_name').value,
            last_name: this.accountForm.get('last_name').value,
            email: this.accountForm.get('email').value,
            hire_date: new Date(this.accountForm.get('hire_date').value),
            title: this.accountForm.get('title').value,
            cell_number: this.accountForm.get('cell_number').value,
            birth_date: new Date(this.accountForm.get('birth_date').value),
            home_address: this.accountForm.get('home_address').value,
            company_id: this.accountForm.get('company_id').value,
            profile_type_id: this.accountForm.get('profile_type_id').value,
            role_id: this.accountForm.get('role_id').value,
            terminated_date: new Date(this.accountForm.get('terminated_date').value),
            active: this.accountForm.get('active').value
        }
        if (!this.profile_id) {
            this._profileService.NewProfile(submitData).subscribe((data) => {
                if (!data.success) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.msg.detail,
                        showConfirmButton: true,
                        //  timer: 1500
                    })
                }
                if (data.success) {
                    this._router.navigate(['/profiles']);

                    Swal.fire({
                        icon: 'success',
                        title: data.msg,
                        showConfirmButton: false,
                        timer: 1500
                    })

                }
            })
        } else {
            this._profileService.updateProfile(this.profile_id, submitData).subscribe((data) => {
                if (!data.success) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.msg.detail,
                        showConfirmButton: true,
                        //  timer: 1500
                    })
                }
                if (data.success) {
                    this._router.navigate(['/profiles']);
                    Swal.fire({
                        icon: 'success',
                        title: data.msg,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        }


    }
    async resetPassword() {
        const { value: password } = await Swal.fire({
            title: 'Password Change',
            input: 'password',
            inputLabel: 'Password',
            inputPlaceholder: 'Enter new password',
            inputAttributes: {
              autocapitalize: 'off',
              autocorrect: 'off',
            }
          })
          
          if (password) {
              this._profileService.resetPassword(this.profile_id,{password}).subscribe((data)=>{
                  if(data.success){
                    Swal.fire({
                        icon: 'success',
                        title: data.msg,
                        showConfirmButton: false,
                        timer: 1500
                    })
                  }
              })
            // Swal.fire(`Entered password: ${password}`)
          }
    }
}
