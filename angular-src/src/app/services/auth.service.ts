import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpClientModule} from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';
import { map, filter, switchMap } from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(
    private http:HttpClient,
    public jwtHelper: JwtHelperService
    ) { }

  registerUser(user){
    let headers= new HttpHeaders();
    headers=headers.append('Content-Type','application/json');
    return this.http.post('users/register',user,{headers: headers})
    .pipe(map(res => res));

  }

  authenticateUser(user):any{
    let headers= new HttpHeaders();
    headers=headers.append('Content-Type','application/json');
    return this.http.post('users/authenticate',user,{headers: headers})
    .pipe(map(res => res));

  }

  getProfile():any{
    this.loadToken();
    let headers= new HttpHeaders({'Content-Type':'application/json',
    'Authorization': this.authToken});
    return this.http.get('users/profile',{headers: headers})
    .pipe(map(res => res));

  }

  

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken= token;
    this.user=user;


  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken= token;
  }

  logout(){
    this.user=null;
    this.authToken= null;
    localStorage.clear();
  }

  loggedIn() {
    return !this.jwtHelper.isTokenExpired(this.authToken);
  }

  
}
