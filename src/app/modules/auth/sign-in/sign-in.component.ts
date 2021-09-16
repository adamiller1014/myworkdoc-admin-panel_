import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import Swal from 'sweetalert2'

@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthSignInComponent implements OnInit
{
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signInForm: FormGroup;
    showAlert: boolean = false;
    needsPassword: boolean = false

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.signInForm = this._formBuilder.group({
            email     : ['', [Validators.required, Validators.email]],
            password  : ['', Validators.required],
            accessCode: [''],
            accessCodeHex: [''],
            rememberMe: ['']
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void
    {
        // Return if the form is invalid
        if ( this.signInForm.invalid )
        {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this._authService.signIn(this.signInForm.value)
        .subscribe(
            async (response) => {
                if (response.success) {
                    if (response.accessCodeHex) {
                        this.signInForm.controls["accessCode"].setValue('');
                        this.signInForm.controls["accessCodeHex"].setValue(response.accessCodeHex);


                        const { value: password } = await Swal.fire({
                            title: 'Enter your new password',
                            input: 'text',
                            inputLabel: 'Password',
                            inputPlaceholder: 'Enter your password',
                            inputAttributes: {
                                autocapitalize: 'off',
                                autocorrect: 'off'
                            }
                        })

                        if (password) {
                            this.signInForm.controls["password"].setValue(password);

                            this.resetPassword()
                            Swal.fire(`Entered password: ${password}`)
                            this.signInForm.enable();

                        }

                    } else if (response.textSent) {
                        this.alert = {
                            type: 'info',
                            message: response.msg
                        };
                        this.showAlert = true;

                        const { value: textCode } = await Swal.fire({
                            title: 'Enter Text Code',
                            text: 'A text code was sent to number on profile',
                            input: 'text',
                            inputValue: '',
                            allowOutsideClick: false,
                            confirmButtonText: 'Confirm',
                            showCancelButton: false,
                            inputValidator: (value) => {
                                if (!value) {
                                    return 'You need to enter text code'
                                }
                            }
                        })

                        if (textCode) {
                            this.signInForm.controls["accessCode"].setValue(textCode);
                            this.signIn();
                            //Swal.fire(`You entered ${textCode}`)
                        }

                    } else {
                        // Set the redirect url.
                        // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
                        // to the correct page after a successful sign in. This way, that url can be set via
                        // routing file and we don't have to touch here.
                        const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

                        // Navigate to the redirect url
                        this._router.navigateByUrl(redirectURL);
                    }


                } else {
                    if (response.retry) {
                        const { value: textCode } = await Swal.fire({
                            title: 'Enter Text Code',
                            html: `A text code was sent to number on profile.<br/>${response.msg}`,
                            input: 'text',
                            inputValue: '',
                            allowOutsideClick: false,
                            confirmButtonText: 'Confirm',
                            showCancelButton: false,
                            inputValidator: (value) => {
                                if (!value) {
                                    return 'You need to enter text code'
                                }
                            }
                        })

                        if (textCode) {
                            this.signInForm.controls["accessCode"].setValue(textCode);
                            this.signIn();
                            //Swal.fire(`You entered ${textCode}`)
                        }
                    } else {
                        this.signInForm.controls["accessCode"].setValue('');
                    }
                    if (response.needsPassword) {
                        this.signInForm.controls["password"].setValidators(Validators.required);
                        this.signInForm.controls["password"].updateValueAndValidity();
                        this.needsPassword = true;
                    }

                    // Re-enable the form
                    this.signInForm.enable();

                    // Reset the form
                    //  this.signInNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message: response.msg
                    };

                    // Show the alert
                    this.showAlert = true;
                }
                switch (response.status) {
                    case 423:
                        // Re-enable the form
                        this.signInForm.enable();

                        // Reset the form
                        //  this.signInNgForm.resetForm();

                        // Set the alert
                        this.alert = {
                            type: 'error',
                            message: response.error
                        };

                        // Show the alert
                        this.showAlert = true;

                        break;
                    case 403:
                        // Re-enable the form
                        this.signInForm.enable();

                        // Reset the form
                        //  this.signInNgForm.resetForm();

                        // Set the alert
                        this.alert = {
                            type: 'error',
                            message: response.error
                        };

                        // Show the alert
                        this.showAlert = true;
                        break;

                        case 0:
                             // Re-enable the form
                        this.signInForm.enable();

                        // Reset the form
                        //  this.signInNgForm.resetForm();

                        // Set the alert
                        this.alert = {
                            type: 'error',
                            message: response.message
                        };

                        // Show the alert
                        this.showAlert = true;
                        break;

                    default:
                        
                        break;
                }
            }
        );
    }
    resetPassword() {
        this._authService.resetPassword(this.signInForm.value).subscribe((data) => {
            console.log(data)
            if(data.success){
                this.signInForm.controls["password"].setValue('');

                this.alert = {
                    type: 'success',
                    message: data.msg
                };


                // Show the alert
                this.showAlert = true;
            }else{
                this.alert = {
                    type: 'error',
                    message: data.msg
                };


                // Show the alert
                this.showAlert = true;
            }

        })
    }
}
