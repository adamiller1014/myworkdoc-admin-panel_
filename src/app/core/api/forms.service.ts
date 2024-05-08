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
   
    /* Global List / List Types API */
    getLists(): Observable<any> {
        return this._httpClient.get(globalConfig.REST_API + 'forms/global/datalists/');
    }

    getList(id): Observable<any> {
        return this._httpClient.get(globalConfig.REST_API + 'forms/global/datalists/' + id);
    }

    getListTypes(): Observable<any> {
        return this._httpClient.get(globalConfig.REST_API + 'forms/global/listtypes');
    }

    getListType(id): Observable<any> {
        return this._httpClient.get(globalConfig.REST_API + 'forms/global/listtypes/' + id);
    }    

    getListItems(id): Observable<any> {
        return this._httpClient.get(globalConfig.REST_API + 'forms/global/datalists/' + id + "/items");
    }

    newDatalist(datalist_info): Observable<any> {
        return this._httpClient.post(globalConfig.REST_API + 'forms/global/datalists/new', datalist_info);
    }

    updateDatalist(id: number, datalist_info): Observable<any> {
        return this._httpClient.put(globalConfig.REST_API + 'forms/global/datalists/edit/' + id, datalist_info);
    }

    getListItem(datalist_id, datalistItem_id): Observable<any> {
        return this._httpClient.get(globalConfig.REST_API + 'forms/global/datalists/' + datalist_id + "/items/" + datalistItem_id);
    }   
    
    newDataItemlist(datalist_id, datalistitem_info): Observable<any> {
        return this._httpClient.post(globalConfig.REST_API + 'forms/global/datalists/' + datalist_id + "/items", datalistitem_info);
    }

    updateDataItemlist(id: number, datalist_id, datalistitem_info): Observable<any> {
        return this._httpClient.put(globalConfig.REST_API + 'forms/global/datalists/' + datalist_id + "/items/" + id, datalistitem_info);
    }    

    newListType(listType_info): Observable<any> {
        return this._httpClient.post(globalConfig.REST_API + 'forms/global/listtypes', listType_info);
    }

    updateListType(id: number, listType_info): Observable<any> {
        return this._httpClient.put(globalConfig.REST_API + 'forms/global/listtypes/' + id, listType_info);
    }        

}