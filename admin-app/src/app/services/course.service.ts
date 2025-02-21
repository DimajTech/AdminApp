import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
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
export class CourseService {
  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(ADMIN_API_URL + 'course/getAllCourses', HTTP_OPTIONS);
  }

  getCourseById(id: string): Observable<Course> {
    return this.http.get<Course>(`${ADMIN_API_URL}course/getCourseById/${id}`, HTTP_OPTIONS);
  }

  saveCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(ADMIN_API_URL + 'course/saveCourse', course, HTTP_OPTIONS);
  }

  deleteCourse(id: string): Observable<void> {
    return this.http.delete<void>(`${ADMIN_API_URL}course/deleteCourse/${id}`, HTTP_OPTIONS);
  }

  getProfessors(): Observable<any> {
    return this.http.get<any>(ADMIN_API_URL + 'user/getProfessors', HTTP_OPTIONS);
  }
}
