import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { globalConfig } from '../config/app.config';
import { environment } from 'environments/environment';

@Injectable()
export class AuthService
{
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }

    get userProfile(): string
    {
        return localStorage.getItem('profileInfo') ?? `{"id":0,"first_name":"Unknown", "email":"Unknown","status":"online"}`;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string, accessCode: string }): Observable<any>
    {
        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError('User is already logged in.');
        }
        const postData = {
            "login": credentials.email,
            "password": credentials.password,
            "accessCode": credentials.accessCode
        }


        return this._httpClient.post(globalConfig.REST_API + 'auth/login', postData).pipe(
            switchMap((response: any) => {
                if (!response) {
                    return of(response);
                } else {
                    if (!response.success) return of(response);
                    if (response.textSent) return of(response);
                    if (response.accessCodeHex) return of(response);
                    // Store the access token in the local storage
                    if (!AuthUtils._decodeToken(response.access_token).access.admin) {
                        return of({ success: false, msg: 'No Permissions for Admin Panel' });
                    }
                    this.accessToken = response.access_token;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = {
                    id:response.profile_info.id,
                    name:response.profile_info.first_name,
                    email:response.profile_info.email,
                    avatar:'assets/images/logo/Logo_Icon.png',
                    status:'online'
                };
               localStorage.setItem('profileInfo', JSON.stringify(response.profile_info))


                }
                // Return a new observable with the response
                return of(response);
            }),catchError((error) =>{
                return of(error)
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any>
    {
        // Renew token
        return this._httpClient.post(globalConfig.REST_API + 'auth/refresh-accessToken', {},{ withCredentials: true }).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {

                if(!response){
                    return of(response);
                }

                if (!AuthUtils._decodeToken(response.access_token).access.admin) {
                    return of(false);
                }
                // Store the access token in the local storage
                this.accessToken = response.access_token;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
             //   this._userService.user = response.user;

             console.log(this.userProfile)

             this._userService.user = {
                id: JSON.parse(this.userProfile).id,
                name:JSON.parse(this.userProfile).first_name,
                email:JSON.parse(this.userProfile).email,
                avatar:'assets/images/logo/Logo_Icon.png',
                status:'online'
            };

                // Return true
                return of(true);
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken )
        {
            console.log('No Access Token')
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            console.log('Expired')
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        if (environment.production) {
            return this.signInUsingToken();
          }else{

            
            this._userService.user = {
                id: JSON.parse(this.userProfile).id,
                name:JSON.parse(this.userProfile).first_name,
                email:JSON.parse(this.userProfile).email,
                avatar:'assets/images/logo/Logo_Icon.png',
                status:'online'
            };

            return of(true);
    
          }
    }
}
