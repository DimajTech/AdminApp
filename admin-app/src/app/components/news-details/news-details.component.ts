import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { NgFor, NgIf } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-news-details',
  imports: [RouterLink, NgIf, NgFor, FormsModule],
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.css'
})
export class NewsDetailsComponent {

  
  constructor(private service: NewsService, private route: ActivatedRoute, private router: Router) { }
  id: string | null = null

  news: any= null;

  //Comments
  totalComments = 0;
  newsComments: any[] = [];
  newsCommentsResponses: any[] = [];

  //Add comments
  commentText = ""
  commentResponseText = "";

  ngOnInit(): void {
    
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.loadNewsDetails(this.id);
      this.loadNewsComments(this.id)

    }
  }

  loadNewsDetails(id: string): void {
    this.service.getNewsDetailsById(id).subscribe({
      next: (news: any) => {
        this.news = news;
      },
      error: (err: any) => {

        //Usar Toast
        console.error(err);
      }
    });
  }

  submitCommentNews(): void {

    const newsCommentData = {
      id:  uuidv4(),
      pieceOfNewsId: this.id,
      authorId: 'c04f0388-19ff-4fc6-8c8d-8de0262ce6e0', //TODO: CAMBIAR 
      text: this.commentText
    };

    this.service.addNewsComment(newsCommentData).subscribe({
      next: () => {
        //alert('Comentario agregad con éxito');

        this.loadNewsComments(this.id ? this.id : "");

      },
      error: (err) => {
        console.error('Error al agregar noticia', err);
      }
    });
  }

  submitCommentRespose(comment: any) {

    const newsCommentResponseData = {
      id:  uuidv4(),
      commentNewsId: comment.id,
      authorId: 'c04f0388-19ff-4fc6-8c8d-8de0262ce6e0', //TODO: CAMBIAR 
      text: this.commentResponseText
    };

    this.service.addNewsCommentResponse(newsCommentResponseData).subscribe({
      next: () => {
        //alert('Comentario agregad con éxito');
        
        this.loadNewsCommentsResponse(comment, false);
        this.totalComments++;

      },
      error: (err) => {
        console.error('Error al agregar noticia', err);
      }
    });   
   }
    
  loadNewsComments(id:string): void {
    this.service.getNewsCommentsById(id).subscribe({
      next: (newsComments: any) => {
        this.newsComments = newsComments;
        this.newsComments.forEach((comment: any) => {

          this.totalComments=0;
          this.loadNewsCommentsResponse(comment, true);
        });

        this.totalComments+=this.newsComments.length
      },
      error: (err: any) => {

        //Usar Toast
        console.error(err);
      }
    });
  }
  loadNewsCommentsResponse(comment: any, sum:boolean): void {
    this.service.getNewsCommentsResponseById(comment.id).subscribe({
      next: (responses: any[]) => {
        comment.responses = responses;

        if(sum)
        this.totalComments+=comment.responses.length

      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  toggleResponseForm(comment: any): void {
    comment.showResponseForm = !comment.showResponseForm;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
  
    date.setHours(date.getHours() - 6);
  
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "p. m." : "a. m.";
  
    hours = hours % 12 || 12;
  
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}, ${hours}:${minutes}:${seconds} ${ampm}`;
  }
  
  
  
  
}
