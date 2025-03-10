import { Component } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';

declare let toastr: any;

@Component({
  selector: 'app-news',
  imports: [NgIf, CommonModule, RouterLink],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})

export class NewsComponent {

    constructor(private service: NewsService, private router: Router) { }

    news: any[] = [];

    ngOnInit(): void {
      this.loadNews();
    }
  
    loadNews(): void {
      this.service.getAllNews().subscribe({
        next: (news: any) => {
          this.news = news;

        },
        error: (err: any) => {

          //Usar Toast
          console.error(err);

          toastr.options.positionClass = 'toast-bottom-right';
          toastr.error('Ha ocurrido un error cargando las noticias');
        }
      });
    }
}
