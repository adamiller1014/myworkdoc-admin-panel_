import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';

import { globalConfig } from '../config/app.config';
@Injectable()
export class FormsService {

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
    ) {
    }



    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    getForms(): Observable<any> {
        return this._httpClient.get(globalConfig.REST_API + 'cases/forms/list');
    }
    newForm(form_info:any): Observable<any> {
        return this._httpClient.post(globalConfig.REST_API + 'cases/form/new',form_info);
    }
    updateForm(form_id:number,form_info:any): Observable<any> {
        return this._httpClient.put(globalConfig.REST_API + 'cases/form/'+form_id,form_info);
    }
    getCaseForm(id:number): Observable<any> {
        return this._httpClient.get(globalConfig.REST_API + 'cases/form/info/'+id);
    }
    getCaseFormTypes(): Observable<any> {
        return this._httpClient.get(globalConfig.REST_API + 'cases/forms/types/list');
    }
   
}