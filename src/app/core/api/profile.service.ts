import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';

import { globalConfig } from '../config/app.config';
@Injectable()
export class ProfileService {
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    ) {
    }



    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    getNotificationSettings(): Observable<any> {
        return this._httpClient.get(globalConfig.REST_API + 'profile/notifications');
    }
    updateNotificationSettings(data): Observable<any> {
        return this._httpClient.put(globalConfig.REST_API + 'profile/update/notifications/',data);
    }
   
    getProfiles(active: boolean): Observable<any> {
        return this._httpClient.get(globalConfig.REST_API + 'profile/list');
    }
    getProfile(id: Number): Observable<any> {
        return this._httpClient.get(globalConfig.REST_API + 'profile/'+id);
    }
    NewProfile(profileData:any): Observable<any> {
        return this._httpClient.post(globalConfig.REST_API + 'profile/new/profile',profileData);
    }
    updateProfile(id: Number,profileData:any): Observable<any> {
        return this._httpClient.put(globalConfig.REST_API + 'profile/'+id,profileData);
    }
    resetPassword(id: Number,profileData:any): Observable<any> {
        return this._httpClient.patch(globalConfig.REST_API + 'profile/reset-password/'+id,profileData);
    }
    a_count_age(age: Number): Observable<any> {
        return this._httpClient.get(globalConfig.REST_API + 'profile/analytics/count_age?age='+age);
    }
    a_count_profiles(range: Number): Observable<any> {
        return this._httpClient.get(globalConfig.REST_API + 'profile/analytics/count_profiles?range='+range);
    }

}