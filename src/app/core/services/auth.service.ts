import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from 'src/app/view/login/model/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  uri: string = environment.URL;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  isLogged = false;
  showNavBar = new EventEmitter<boolean>();
  constructor(private httpClient: HttpClient, public router: Router) {
    localStorage.setItem('access_token', '');
  }

  login(user: User) {
    let api = `${this.uri}authenticate`;
    return this.httpClient.post<any>(api, user).subscribe({
      next: (res) => {
        localStorage.setItem('access_token', res.token);
        this.isLogged = true;
        this.showNavBar.emit(true);
        this.router.navigate(['clientes']);
      },
      error: (res) => {
        alert('Cliente não cadastrado!');
      },
    });
  }

  register(user: User) {
    let api = `${this.uri}register`;
    return this.httpClient.post<any>(api, user);
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get isLoggedIn(): boolean {
    return localStorage.getItem('access_token') !== null && this.isLogged;
  }

  getUserProfile(id): Observable<any> {
    let api = `${this.uri}/users/${id}`;
    return this.httpClient.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
