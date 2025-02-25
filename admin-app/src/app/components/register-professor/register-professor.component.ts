import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { RegisterProfessorService } from '../../services/register-professor.service';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
/*import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
*/
@Component({
  selector: 'app-register-professor',
  imports: [FormsModule, NgIf],
  templateUrl: './register-professor.component.html',
  styleUrl: './register-professor.component.css',
})
export class RegisterProfessorComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private service: RegisterProfessorService,
    private router: Router
  ) {}

  submitProfessor(professorForm: NgForm): void {
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      //this.showToast('Todos los campos son obligatorios.', 'error');
      return;
    }

    if (this.password !== this.confirmPassword) {
      //this.showToast('Las contraseñas no coinciden.', 'error');
      return;
    }

    const professorData = {
      id: uuidv4()+"",
      name: this.name,
      email: this.email,
      password: this.password,
      role: 'professor',
      isActive: true,
    };

    this.service.registerProfessor(professorData).subscribe({
      next: () => {
        //this.showToast('Usuario registrado con éxito.', 'success');

        //Envío de correo para informe de registro
        this.service.sendRegistrationEmail(professorData).subscribe({
          next: (response) => {
            console.log('Correo enviado con éxito:', response);
          },
          error: (err: any) => {
            console.error('Error al enviar el correo:', err);
            //this.showToast('Error al enviar el correo.', 'error');
          },
        });

        //Registro en StudentApp
        this.service.registerOnStudent(professorData).subscribe({
          next: () => {},
          error: (err: any) => {
           //this.showToast('Error al registrar en StudentApp.', 'error');
          },
        });
        //Registro en ProfessorApp
        this.service.registerOnProfessor(professorData).subscribe({
          next: () => {
            /*this.showToast(
              'Usuario registrado con éxito en Professor.',
              'success'
            );
            */
          },
          error: (err: any) => {
           // this.showToast('Error al registrar en Professor.', 'error');
          },
        });
        professorForm.reset();
      },
      error: (err: any) => {
        /*this.showToast(
          err.error.message || 'Error al registrar el usuario.',
          'error'
        );*/
      },
    });
  }

  /*
  showToast(message: string, type: 'success' | 'error') {
    Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: 'top',
      position: 'right',
      backgroundColor: type === 'success' ? 'green' : 'red',
    }).showToast();
  }
    */
  resetForm(professorForm: NgForm): void {
    professorForm.reset();
  }
}
