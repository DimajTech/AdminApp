import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

const ADMIN_API_URL = 'http://localhost:8080/api/'
//const PROFESSOR_API_URL = 'https://professorapi-fefwaxftanf2arfp.mexicocentral-01.azurewebsites.net/api/'
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
export class NewsService {

constructor(private http:HttpClient) { }

  getAllNews(): Observable<any>{
    return this.http.get<any>(ADMIN_API_URL + 'pieceOfNews/getAllPieceOfNews', HTTP_OPTIONS);
  }

  getNewsDetailsById(id: string): Observable<any> {
    return this.http.get(ADMIN_API_URL+ 'pieceOfNews/getPieceOfNewsDetailById/' + id, HTTP_OPTIONS);
  }

  addNews(newsData: any): Observable<any> {

    const newsDataFormat = {
      id: newsData.id + "",
      title: newsData.title,
      description: newsData.description,
      picture: newsData.picture,
      userId: newsData.authorId,
      userRole: "administrator"
    };
  
    return forkJoin([
      this.http.post<any>(PROFESSOR_API_URL + 'PieceOfNews/AddPieceOfNews', newsDataFormat, HTTP_OPTIONS),
      this.http.post<any>(STUDENT_URL + 'PieceOfNews/CreateNewsFromAdmin', newsDataFormat, HTTP_OPTIONS),
      this.http.post<any>(ADMIN_API_URL + 'pieceOfNews/savePieceOfNews', newsData, HTTP_OPTIONS)
    ]);
  }
  getNewsCommentsById(id: string): Observable<any> {
    return this.http.get(ADMIN_API_URL+ 'commentNews/getCommentNewsById/' + id, HTTP_OPTIONS);
  }

  deleteCommentNewsById(id: string): Observable<any> {

    return forkJoin([
      this.http.post(PROFESSOR_API_URL+ 'CommentNews/DeleteCommentNewsById/' + id, HTTP_OPTIONS),
      this.http.post(STUDENT_URL+ 'CommentNews/DeleteCommentNewsById/' + id, HTTP_OPTIONS),
      this.http.post(ADMIN_API_URL+ 'commentNews/deleteCommentNewsById/' + id, HTTP_OPTIONS)
    ]);
  }
  
  deleteCommentNewsResponseById(id: string): Observable<any> {

    return forkJoin([
      this.http.post(PROFESSOR_API_URL+ 'CommentNews/DeleteResponseById/' + id, HTTP_OPTIONS),
      this.http.post(STUDENT_URL+ 'CommentNews/DeleteResponseById/' + id, HTTP_OPTIONS),
      this.http.post(ADMIN_API_URL+ 'commentNewsResponse/deleteCommentNewsResponseById/' + id, HTTP_OPTIONS)
    ]);
  } 

  deletePieceOfNewsById(id: string): Observable<any> {

    return forkJoin([
      this.http.post(PROFESSOR_API_URL+ 'pieceOfNews/DeletePieceOfNews/' + id, HTTP_OPTIONS),
      this.http.post(STUDENT_URL+ 'PieceOfNews/DeletePieceOfNews/' + id, HTTP_OPTIONS),
      this.http.post(ADMIN_API_URL+ 'pieceOfNews/deletePieceOfNewsById/' + id, HTTP_OPTIONS),
    ]);
  }


  getNewsCommentsResponseById(id: string): Observable<any> {
    return this.http.get(ADMIN_API_URL+ 'commentNewsResponse/getCommentNewsResponseById/' + id, HTTP_OPTIONS);
  }

  addNewsComment(newsCommentData: any): Observable<any> {
    return forkJoin([
      this.http.post(PROFESSOR_API_URL+ 'CommentNews/AddNewsCommentFromMVC/', newsCommentData, HTTP_OPTIONS),
      this.http.post(STUDENT_URL+ 'CommentNews/AddNewsCommentFromAPI/', newsCommentData, HTTP_OPTIONS),
      this.http.post<any>(ADMIN_API_URL + 'commentNews/saveCommentNews', newsCommentData, HTTP_OPTIONS)
    ]);
  }
  
  addNewsCommentResponse(newsCommentResponseData: any): Observable<any> {

    return forkJoin([
      this.http.post(PROFESSOR_API_URL+ 'CommentNews/AddNewsCommentResponseFromMVC/', newsCommentResponseData, HTTP_OPTIONS),
      this.http.post(STUDENT_URL+ 'CommentNews/AddNewsCommentResponseFromAPI/', newsCommentResponseData, HTTP_OPTIONS),
      this.http.post<any>(ADMIN_API_URL + 'commentNewsResponse/saveCommentNewsResponse', newsCommentResponseData, HTTP_OPTIONS)
    ]);     
  }
  

}


