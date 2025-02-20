import { Component, OnInit } from '@angular/core';
import { RegistrationApplicationsService } from '../../services/registration-applications.service';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
//import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration-applications',
  imports: [NgIf, CommonModule],
  templateUrl: './registration-applications.component.html',
  styleUrl: './registration-applications.component.css'
})
export class RegistrationApplicationsComponent implements OnInit {
  constructor(private service: RegistrationApplicationsService, private router: Router) { }

  pendingUsers: any[] = [];
  loading = false;
  error = '';

  ngOnInit(): void {
    this.loadPendingUsers();
  }

  loadPendingUsers(): void {
    this.loading = true;
    this.service.getPendingUsers().subscribe({
      next: (users: any) => {
        this.pendingUsers = users;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Error al cargar usuarios pendientes';
        this.loading = false;
        console.error(err);
      }
    });
  }

  changeUserStatus(user: any, status: string): void {
    this.loading = true;
    this.service.changeUserStatus(user.id, status).subscribe({
      next: () => {
        this.pendingUsers = this.pendingUsers.filter(u => u.id !== user.id);
        this.loading = false;
      },
      error: (err: any) => {
        this.error = `Error al realizar acción`;
        this.loading = false;
        console.error(err);
      }
    });
  }


}

