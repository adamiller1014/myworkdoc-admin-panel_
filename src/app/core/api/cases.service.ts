import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';

import { globalConfig } from '../config/app.config';
@Injectable()
export class CasesService {
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




    getNoteTypes(): Observable<any> {
        return this._httpClient.get(globalConfig.REST_API + 'cases/notes/types');
    }

    saveCaseInstructions(data): Observable<any> {
        return this._httpClient.post(globalConfig.REST_API + 'cases/instructions/new',data);
    }
    getCaseInstructions(id): Observable<any> {
        return this._httpClient.get(globalConfig.REST_API + 'cases/instructions/'+id);
    }

    getCases(type,range): Observable<any> {
        return this._httpClient.get(globalConfig.REST_API + 'cases/list?type='+type+'&range='+range);
    }
    getRoomAnalytics(type,range): Observable<any> {
        return this._httpClient.get(globalConfig.REST_API + 'rooms/analytics?type='+type+'&range='+range);
    }
    getCaseAnalytics(type,range): Observable<any> {
        return this._httpClient.get(globalConfig.REST_API + 'cases/analytics?type='+type+'&range='+range);
    }
    getCase(id): Observable<any> {
        return this._httpClient.get(globalConfig.REST_API + 'cases/case/'+id);
    }

    saveCaseNotes(data): Observable<any> {
        return this._httpClient.post(globalConfig.REST_API + 'cases/notes/new',data);
    }

   
}