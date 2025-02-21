import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const ADMIN_API_URL = 'http://localhost:8080/api/'
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class NewsService {

constructor(private http:HttpClient) { }

  getAllNews(): Observable<any>{
    return this.http.get<any>(ADMIN_API_URL + 'pieceOfNews/getAllPieceOfNews', HTTP_OPTIONS);
  }

  getNewsDetailsById(id: string): Observable<any> {
    return this.http.get(ADMIN_API_URL+ 'pieceOfNews/getPieceOfNewsDetailById/' + id, HTTP_OPTIONS);
  }

  addNews(newsData: any): Observable<any> {
    return this.http.post<any>(ADMIN_API_URL + 'pieceOfNews/savePieceOfNews', newsData, HTTP_OPTIONS);
  }
  
  getNewsCommentsById(id: string): Observable<any> {
    return this.http.get(ADMIN_API_URL+ 'commentNews/getCommentNewsById/' + id, HTTP_OPTIONS);
  }

  getNewsCommentsResponseById(id: string): Observable<any> {
    return this.http.get(ADMIN_API_URL+ 'commentNewsResponse/getCommentNewsResponseById/' + id, HTTP_OPTIONS);
  }

  addNewsComment(newsCommentData: any): Observable<any> {

    return this.http.post<any>(ADMIN_API_URL + 'commentNews/saveCommentNews', newsCommentData, HTTP_OPTIONS);
  }
  
  addNewsCommentResponse(newsCommentResponseData: any): Observable<any> {

    console.log(newsCommentResponseData)
    return this.http.post<any>(ADMIN_API_URL + 'commentNewsResponse/saveCommentNewsResponse', newsCommentResponseData, HTTP_OPTIONS);
  }
  
  /*
  
  public getAllEmployee(): Observable<any> {
    return this.webApiService.get(httpLink.getAllEmployee);
  }

  public deleteEmployeeById(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deleteEmployeeById + '/' + model, "");
  }



  public saveEmployee(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveEmployee, model);
  }
  */

}


