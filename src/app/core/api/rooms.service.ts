import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';

import { globalConfig } from '../config/app.config';
@Injectable()
export class RoomsService {
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
    getRooms(): Observable<any> {
        return this._httpClient.get(globalConfig.REST_API + 'rooms/list');
    }

    getRoom(id): Observable<any> {
        return this._httpClient.get(globalConfig.REST_API + 'rooms/room/'+id);
    }
    updateRoom(id,data): Observable<any> {
        return this._httpClient.put(globalConfig.REST_API + 'rooms/room/'+id,data);
    }
   
}