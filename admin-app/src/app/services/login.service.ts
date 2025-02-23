import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const ADMIN_API_URL = 'http://localhost:8080/api/'
const PROFESSOR_API_URL = 'https://localhost:7039/api/'
const STUDENT_API_URL = 'https://localhost:7047/'

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  
  getUserByEmail(email: string): Observable<any> {
    return this.http.get(ADMIN_API_URL+ 'user/getUserDetailByEmail/' + email, HTTP_OPTIONS);
  }
  
}
