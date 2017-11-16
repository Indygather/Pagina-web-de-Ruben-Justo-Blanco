import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import 'rxjs/add/operator/map';
 
@Injectable()
export class AuthenticationService {
    public token: string;
 
    url = 'http://rubenjustoblanco.com/martket-backend/v1/index.php/';
    //url = 'http://localhost/martket-backend/v1/index.php/';

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
 
    login(username: string, password: string) {
        let headers = new Headers({
            'User': username,
            'Authorization': password
        });

        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.url+'login', options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                let idUser = response.json() && response.json().idUser;
                if (token) {
                    // set token property
                    this.token = token;
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token, idUser: idUser}));
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    register(user: User) {

        let json = JSON.stringify(user);
        let params = 'json='+json;
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.url+'register',params, options)
            .map(res => res.json());
    }
}