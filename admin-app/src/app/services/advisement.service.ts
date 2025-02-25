import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Advisement } from '../models/advisement.model';

const ADMIN_API_URL = 'http://localhost:8080/api/';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AdvisementService {
  constructor(private http: HttpClient) {}

  getPublicAdvisements(): Observable<Advisement[]> {
    return this.http.get<Advisement[]>(
      ADMIN_API_URL + 'advisements/getPublicAdvisements',
      HTTP_OPTIONS
    );
  }

  getPrivateAdvisements(): Observable<Advisement[]> {
    return this.http.get<Advisement[]>(
      ADMIN_API_URL + 'advisements/getPrivateAdvisements',
      HTTP_OPTIONS
    );
  }

  getAdvisementById(id: string): Observable<Advisement> {
    return this.http.get<Advisement>(
      `${ADMIN_API_URL}advisements/getAdvisementById/${id}`,
      HTTP_OPTIONS
    );
  }
}
