import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const ADMIN_API_URL = 'https://administratorapi-b4eqd2exgxdwekfy.mexicocentral-01.azurewebsites.net/api/'
const PROFESSOR_API_URL = 'https://professorapi-fefwaxftanf2arfp.mexicocentral-01.azurewebsites.net/api/'
const STUDENT_URL = 'https://studentapp1-erbxc6gkbvcracg5.brazilsouth-01.azurewebsites.net/'

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
