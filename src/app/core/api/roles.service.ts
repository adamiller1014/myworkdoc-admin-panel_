import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';


import { globalConfig } from '../config/app.config';
@Injectable()
export class RolesService {

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
    getAllRoles(): Observable<any> {
        return this._httpClient.get(globalConfig.REST_API + 'roles/list/all');
    }

    getAllRolesByCompany(id): Observable<any> {
        return this._httpClient.get(globalConfig.REST_API + 'roles/list/all?company_id='+id);
    }

    updateRole(id,data): Observable<any> {
        return this._httpClient.put(globalConfig.REST_API + 'roles/update/'+id,data);
    }
    getRole(id): Observable<any> {
        return this._httpClient.get(globalConfig.REST_API + 'roles/role/'+id);
    }
    newRole(data): Observable<any> {
        return this._httpClient.post(globalConfig.REST_API + 'roles/new',data);
    }


}