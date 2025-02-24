import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

declare let toastr: any; 
declare let localStorage: any; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
email: any;
password: any;
validation: any;

constructor(private service: LoginService, private router: Router) { }


loginUser(): void {

  toastr.options.positionClass = 'toast-bottom-right';

  this.service.getUserByEmail(this.email).subscribe({
    next: (user: any) => {

      console.log(user)
      if (!user || user.password !== this.password) {
        this.validation = 'Credenciales inválidas.';
        return;
      }

      if (user.registrationStatus !== 'accepted') {
        this.validation ='Su usuario aún no ha sido aprobado.'
        return;
      }

      if (!user.isActive) {
        this.validation = 'Su usuario se encuentra inactivo. Contacte un administrador.';
        return;
      }

      if (user.role !== 'administrator') {
        this.validation ='Su usuario no es un administrador.';
        return;
      }

      // Guardar datos en localStorage (simulando cookie)
      document.cookie = `AuthCookieAdmin=${encodeURIComponent(user.email + '|' + user.id)}; path=/; secure; samesite=strict; max-age=${3 * 60 * 60}`;

      localStorage.setItem("email", user.email);
      localStorage.setItem("role", user.role);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userPicture", user.picture);

      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    },
    error: (err: any) => {
      console.error('Error en la autenticación:', err);
      toastr.error('Ha ocurrido un error en el servidor.', 'Error');
    }
  });
}


}
