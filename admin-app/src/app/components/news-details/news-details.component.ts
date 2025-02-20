import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-news-details',
  imports: [RouterLink, NgIf],
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.css'
})
export class NewsDetailsComponent {

  constructor(private service: NewsService, private route: ActivatedRoute) { }
  
  news: any = null;
 
  ngOnInit(): void {
    // Obtener el ID desde la URL
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.loadNewsDetails(id);
    }
  }
  loadNewsDetails(id: string): void {
    this.service.getNewsDetailsById(id).subscribe({
      next: (news: any) => {
        this.news = news;

        console.log(news)
      },
      error: (err: any) => {

        //Usar Toast
        console.error(err);
      }
    });
  }
}
