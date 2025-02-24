import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

const ADMIN_API_URL = 'http://localhost:8080/api/';
const SEND_EMAIL_API_URL = 'http://localhost:5092/api/SendEmail';
const STUDENT_API_URL = 'https://localhost:7047/';
const PROFESSOR_API_URL = 'https://localhost:7039/api/';
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class RegisterProfessorService {
  constructor(private http: HttpClient) {}

  //Register on AdminDB
  registerProfessor(professor: any): Observable<any> {
    return this.http.post<any>(
      ADMIN_API_URL + 'user/saveProfessorUser',
      professor,
      HTTP_OPTIONS
    );
  }
  sendRegistrationEmail(professor: any): Observable<any> {
    const emailData = {
      toUser: 'blancasc2002@gmail.com',
      subject: 'System Registration',
      content:
        "<html lang='es'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Email de Bienvenida</title><style>body{font-family:Arial,sans-serif;background-color:#f4f4f4;padding:20px;}.container{max-width:600px;background:#ffffff;padding:20px;border-radius:8px;box-shadow:0px 0px 10px rgba(0,0,0,0.1);text-align:center;}.logo{width:300px;margin-bottom:20px;}h1{color:#00693e;}p{color:#333;font-size:16px;}.footer{margin-top:20px;font-size:12px;color:#666;}.credentials{margin-top:20px;font-size:14px;color:#333;}.email,.password{font-weight:bold;color:#00693e;}</style></head><body><div class='container'><img src='https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh5057rSlx1GVQGuaLOV0oMvYZnSlUUm5szF7HaA_sSFdbVuAQ-oSBKMjBHjjX2YSZtBaIhY6ccW7jGKp3j_mi-eYL58Sz2oS3ZRDMY0V1bzOEaRUsnUsMqEGvaT7-zcwqIxGdkmEi-0DsO/w1200-h630-p-k-no-nu/UCR+logo+transparente.png' alt='Logo UCR' class='logo'><h1>¡Bienvenido a la Universidad de Costa Rica!</h1><p>Estimado/a <strong>" +
        professor.name +
        "</strong>,</p><p>Le damos la bienvenida a nuestro sistema. Su cuenta ha sido registrada exitosamente por el administrador. A continuación, le proporcionamos las credenciales para acceder a nuestro portal.</p><div class='credentials'><p><strong>Correo electrónico:</strong> <span class='email'>" +
        professor.email +
        "</span></p><p><strong>Contraseña temporal:</strong> <span class='password'>" +
        professor.password +
        "</span></p></div><p>Por favor, recuerde cambiar su contraseña temporal al ingresar por primera vez para garantizar la seguridad de su cuenta.</p><p class='footer'>Si tiene alguna duda, no dude en ponerse en contacto con nosotros.</p></div></body></html>",
    };

    return this.http.post<any>(
      SEND_EMAIL_API_URL + '/SendEmail',
      emailData,
      HTTP_OPTIONS
    );
  }

  //External calls

  //Todo: arreglar status
  registerOnStudent(professor: any): Observable<any> {
    return this.http.post<any>(
      STUDENT_API_URL + 'User/RegisterProfessor',
      professor,
      HTTP_OPTIONS
    );
  }
  registerOnProfessor(professor: any): Observable<any> {
    const professorData = {
      id: professor.id,
      name: professor.name,
      email: professor.email,
      password: professor.password,
      registrationStatus: 'accepted',
      role: 'professor',
    };
    return this.http.post<any>(
      PROFESSOR_API_URL + 'User/PostUser',
      professorData,
      HTTP_OPTIONS
    );
  }
}
