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

  changeUserStatus(id: string, status: string): Observable<any>{
    const body = {
      status: status
    };
    return this.http.patch<any>(ADMIN_API_URL + 'user/changeUserStatus/' + id, status, HTTP_OPTIONS);
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


