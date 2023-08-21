import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { SubcriptionService } from './subcription.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private subcription: SubcriptionService
  ) {}

  registerUser(userdetails: any) {
    return this.http.post(this.baseURL + '/registration', userdetails);
  }

  login(loginDetails: any) {
    return this.http.post(this.baseURL + '/login', loginDetails);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  userDetails() {
    return this.http.get(this.baseURL + '/me');
  }

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken();
    return jwtHelper.decodeToken(token);
  }

  // login(user: UserLogin) {
  //   return this.http.post<any>(this.baseURL, user).pipe(
  //     map((response) => {
  //       if (response?.token) {
  //         localStorage.setItem('authToken', response.token);
  //         this.setUserDetails();
  //       }
  //       return response;
  //     }),
  //     shareReplay()
  //   );
  // }
}
