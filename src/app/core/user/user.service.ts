import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from 'app/core/user/user.types';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User) {
        // Store the value
        this._user.next(value)
      /*   this._user.next({
            id    : 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
            name  : 'Admin',
            email : 'admin@myworkdoc.com',
            avatar: '',
            status: 'online'
        }); */
    }

    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    get(): Observable<User> {
        // {
        //     id:1,
        //     name: 'Tristen',
        //     email:'tristen.russ@Myworkdoc'
        // }

        return of(this.user);
        // return this._httpClient.get<User>('api/common/user').pipe(
        //     tap((user) => {
        //         this._user.next(user);
        //     })
        // );
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any> {
        console.log(user)
        return of(this._user.next(user));
    }
}
