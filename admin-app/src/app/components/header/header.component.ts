import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  userImage = '/images/user.png';
  isLoggedIn = false; // Variable para verificar si está autenticado

  constructor(private router: Router) { }
  
  ngOnInit() {
    // Verificar si la cookie de autenticación existe
    this.isLoggedIn = document.cookie.split('; ').some(row => row.startsWith('AuthCookieAdmin='));

    if (typeof window !== 'undefined' && window.localStorage) {
      const storedImage = window.localStorage.getItem("userPicture");
      if (storedImage) {
        this.userImage = storedImage;
      }
    }
  }

  logout() {
    Swal.fire({
      title: 'Cerrar sesión',
      text: 'Estás a punto de salir de tu cuenta',
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar'
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        document.cookie = 'AuthCookieAdmin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        this.isLoggedIn = false; // Actualizar estado
        this.router.navigate(['/login']);
      }
    });
  }
}
