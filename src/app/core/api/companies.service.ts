import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';

import { globalConfig } from '../config/app.config';
@Injectable()
export class CompaniesService {
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

    /**
     * Get Rooms
     *
     * 
     */
    getCompanies(active): Observable<any> {
        return this._httpClient.get(globalConfig.REST_API + 'companies/list?active='+active);
    }

    newCompany(companyData:any): Observable<any> {
        return this._httpClient.post(globalConfig.REST_API + 'companies/new',companyData);
    }
    updateCompany(company_id:Number,companyData:any): Observable<any> {
        return this._httpClient.put(globalConfig.REST_API + 'companies/'+company_id,companyData);
    }
    getCompany(company_id:Number): Observable<any> {
        return this._httpClient.get(globalConfig.REST_API + 'companies/'+company_id);
    }
  
   
}