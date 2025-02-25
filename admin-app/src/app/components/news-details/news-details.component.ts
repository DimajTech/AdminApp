import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { NgFor, NgIf } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

declare let toastr: any; // Declaramos toastr para que TypeScript no se queje

@Component({
  selector: 'app-news-details',
  imports: [RouterLink, NgIf, NgFor, FormsModule],
  standalone: true,
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
  commentTextIsEmpty = false;
  commentResponseText = "";
  commentResponseTextIsEmpty = false;

  userId: string | null =''

  ngOnInit(): void {
    
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.loadNewsDetails(this.id);
      this.loadNewsComments(this.id)

    }

     this.userId = window.localStorage.getItem("userId");
  }

  deletePieceOfNews() {

    toastr.options.positionClass = 'toast-bottom-right';

    Swal.fire({
         title: 'Eliminar Noticia',
         text: 'Estás a punto de eliminar la noticia publicada por '+this.news.authorName+ ' con '+
         'título: "'+ this.news.title + '"'+
         '. Esta acción es irreversible.',
         showCancelButton: true,
         confirmButtonText: 'Continuar',
         cancelButtonText: 'Cancelar'
       }).then(async (result: any) => {
         if (result.isConfirmed) {

           this.service.deletePieceOfNewsById(this.news.id).subscribe({
             next: () => {
       
               toastr.success('Noticia eliminada correctamente');
               this.router.navigate(['/']);
             },
             error: (err) => {
       
               toastr.error('Ha ocurrido un error al eliminar la noticia, intente de nuevo más tarde.');  
               console.log(err)  
             }
           });
         }
       });

 }
  deleteComment(comment: any) {

     toastr.options.positionClass = 'toast-bottom-right';

     Swal.fire({
          title: 'Eliminar comentario',
          text: 'Estás a punto de eliminar el comentario de '+comment.name+'. Esta acción es irreversible.',
          showCancelButton: true,
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar'
        }).then(async (result: any) => {
          if (result.isConfirmed) {

            this.service.deleteCommentNewsById(comment.id).subscribe({
              next: () => {
        
                toastr.success('Comentario eliminado correctamente');
    
                this.loadNewsComments(this.id ? this.id : "");
        
              },
              error: (err) => {
        
                toastr.error('Ha ocurrido un error al eliminar el comentario, intente de nuevo más tarde.');    
              }
            });
          }
        });

  }
  deleteResponse(response: any) {

    toastr.options.positionClass = 'toast-bottom-right';

    Swal.fire({
         title: 'Eliminar respuesta',
         text: 'Estás a punto de eliminar la respuesta de '+response.name+'. Esta acción es irreversible.',
         showCancelButton: true,
         confirmButtonText: 'Continuar',
         cancelButtonText: 'Cancelar'
       }).then(async (result: any) => {
         if (result.isConfirmed) {

           this.service.deleteCommentNewsResponseById(response.id).subscribe({
             next: () => {
       
               toastr.success('Respuesta eliminada correctamente');
   
               this.loadNewsComments(this.id ? this.id : "");
       
             },
             error: (err) => {
       
               toastr.error('Ha ocurrido un error al eliminar la respuesta, intente de nuevo más tarde.');    
             }
           });
         }
       });

 }
  loadNewsDetails(id: string): void {
    this.service.getNewsDetailsById(id).subscribe({
      next: (news: any) => {
        this.news = news;
      },
      error: (err: any) => {

        //Usar Toast
        toastr.options.positionClass = 'toast-bottom-right';
        toastr.error('Ha ocurrido un error cargando la noticia o ha sido borrada');
        console.error(err);
      }
    });
  }

  submitCommentNews(): void {

    toastr.options.positionClass = 'toast-bottom-right';

    if (this.commentText && this.commentText.trim() !== '') {

      const newsCommentData = {
        id:  uuidv4(),
        pieceOfNewsId: this.id,
        authorId: this.userId, 
        text: this.commentText
      };
  
      this.service.addNewsComment(newsCommentData).subscribe({
        next: () => {
  
          toastr.success('Comentario agregado correctamente');
          this.commentTextIsEmpty = false;

          this.loadNewsComments(this.id ? this.id : "");
  
        },
        error: (err) => {
  
          toastr.error('Ha ocurrido un error al agregar el comentario, intente de nuevo más tarde.');    
        }
      });
  
      this.commentText = ""
    } else{

      toastr.error('Por favor rellene todos los campos.');      
      this.commentTextIsEmpty = true;
    }
    
  }

  submitCommentRespose(comment: any) {

    toastr.options.positionClass = 'toast-bottom-right';

    if (this.commentResponseText && this.commentResponseText.trim() !== '') {
      const newsCommentResponseData = {
        id:  uuidv4(),
        commentNewsId: comment.id,
        authorId: this.userId, 
        text: this.commentResponseText
      };
  
      this.service.addNewsCommentResponse(newsCommentResponseData).subscribe({
        next: () => {
          //alert('Comentario agregad con éxito');
          toastr.success('Respuesta agregada correctamente');
  
          this.commentResponseTextIsEmpty = false;

          this.loadNewsCommentsResponse(comment, false);
          this.totalComments++;
  
        },
        error: (err) => {
  
          toastr.error('Ha ocurrido un error al agregar la respuesta, intente de nuevo más tarde.');      }
      });   
      this.commentResponseText = "";
    }else{
      
      toastr.error('Por favor rellene todos los campos.');      
      this.commentResponseTextIsEmpty = true;
    }
   
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
        
        toastr.options.positionClass = 'toast-bottom-right';
        toastr.error('Ha ocurrido un error al cargar los comentarios, intente de nuevo más tarde.');
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
