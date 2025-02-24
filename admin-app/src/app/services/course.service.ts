import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { Observable } from 'rxjs';

const ADMIN_API_URL = 'http://localhost:8080/api/'
const PROFESSOR_API_URL = 'https://localhost:7039/api/'
const STUDENT_URL = 'https://localhost:7047/'

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

  saveCourseInAdmin(course: Course): Observable<any> {
    return this.http.post<{ message: string; course: Course }>(
      ADMIN_API_URL + 'course/saveCourse',
      course,
      HTTP_OPTIONS
    );
  }

  deleteCourse(id: string): Observable<void> {
    return this.http.delete<void>(`${ADMIN_API_URL}course/deleteCourse/${id}`, HTTP_OPTIONS);
  }

  getProfessors(): Observable<any> {
    return this.http.get<any>(ADMIN_API_URL + 'user/getProfessors', HTTP_OPTIONS);
  }

  //----------PROFESSOR METHODS----------
  saveCourseInProfessor(course: Course): Observable<any> {
    return this.http.post<{ message: string; course: Course }>(
      PROFESSOR_API_URL + 'Course/PostCourse',
      course,
      HTTP_OPTIONS
    );
  }

  updateCourseInProfessor(course: Course): Observable<any> {
    return this.http.put<{ message: string; course: Course }>(
      `${PROFESSOR_API_URL}Course/PutCourse/${course.id}`,
      course,
      HTTP_OPTIONS
    );
  }

  deleteCourseInProfessor(id: string | undefined): Observable<any> {
    return this.http.delete<any>(`${PROFESSOR_API_URL}Course/DeleteCourse/${id}`, HTTP_OPTIONS);
  }

  //----------STUDENT METHODS----------
  saveCourseInStudent(course: Course): Observable<any> {
    return this.http.post<{ message: string; course: Course }>(
      STUDENT_URL + 'Course/PostCourse/',
      course,
      HTTP_OPTIONS
    );
  }

  deleteCourseInStudent(id: string | undefined): Observable<any> {
    return this.http.delete<any>(`${STUDENT_URL}Course/DeleteCourse/${id}`, HTTP_OPTIONS);
  }

  updateCourseInStudent(course: Course): Observable<any> {
    return this.http.put<{ message: string; course: Course }>(
      `${STUDENT_URL}Course/PutCourse/${course.id}`,
      course,
      HTTP_OPTIONS
    );
  }
}
