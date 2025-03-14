import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


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
export class RegistrationApplicationsService {

  constructor(private http:HttpClient) { }

  getPendingUsers(): Observable<any>{
    return this.http.get<any>(ADMIN_API_URL + 'user/getPendingUsers', HTTP_OPTIONS);
  }

  changeUserStatus(id: string, status: string): Observable<any>{
    const body = { status: status };

    const resultAdmin = this.http.patch<any>(ADMIN_API_URL + 'user/changeUserStatus/' + id, status, HTTP_OPTIONS).pipe(
      catchError((error) => {
        console.error('Error en cambio de estado de usuario (admin):', error);
        return of({ success: false, message: 'Error en administrador' });
      })
    );
  
    const resultProfessor = this.http.patch<any>(PROFESSOR_API_URL + 'User/ChangeUserStatus/' + id, body, HTTP_OPTIONS).pipe(
      catchError((error) => {
        console.error('Error en cambio de estado de usuario (profesor):', error);
        return of({ success: false, message: 'Error en profesor' });
      })
    );

    const resultStudent = this.http.patch<any>(STUDENT_URL + 'User/ChangeUserStatus/' + id, body, HTTP_OPTIONS).pipe(
      catchError((error) => {
        console.error('Error en cambio de estado de usuario (estudiante):', error);
        return of({ success: false, message: 'Error en profesor' });
      })
    );
  
    return forkJoin([resultAdmin, resultProfessor, resultStudent]);
  }

}
