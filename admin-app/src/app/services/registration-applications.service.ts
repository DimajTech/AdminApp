import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';

const ADMIN_API_URL = 'http://localhost:8080/api/'
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RegistrationApplicationsService {

  constructor(private http:HttpClient) { }

  getPendingUsers(): Observable<any>{
    return this.http.get<any>(ADMIN_API_URL + 'user/getPendingUsers', HTTP_OPTIONS);
  }

  changeUserStatus(id: string, status: string): Observable<any>{
    const body = {
      status: status
    };
    return this.http.patch<any>(ADMIN_API_URL + 'user/changeUserStatus/' + id, status, HTTP_OPTIONS);
  }

}
