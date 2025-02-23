import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { NewsService } from '../../services/news.service';
import { FormsModule } from '@angular/forms';
declare let toastr: any; // Declaramos toastr para que TypeScript no se queje

@Component({
  selector: 'app-create-news',
  imports: [RouterLink, FormsModule],
  templateUrl: './create-news.component.html',
  standalone: true,
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent {
  previewImage: string = '/images/istockphoto-1128826884-612x612.jpg'; 
  fileName: string = 'Sin archivos seleccionados';
  title: string = '';
  description: string = '';
  authorId: string = 'c04f0388-19ff-4fc6-8c8d-8de0262ce6e0'; //TODO obtener usuario loggeado
  picture: any = null;

  constructor(private service: NewsService, private router: Router) { }
  
  previewSelectedImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.fileName = file.name; 

      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result as string; 
      };

      reader.readAsDataURL(file); 
    }
  }

  submitNews(): void {

    const newsData = {
      id:  uuidv4(),
      title: this.title,
      description: this.description,
      authorId: this.authorId,
      picture: this.previewImage ? this.previewImage : null
    };

    this.service.addNews(newsData).subscribe({
      next: () => {
        //alert('Noticia agregada con éxito');
        toastr.options.positionClass = 'toast-bottom-right';
        toastr.success('Noticia agregada con éxito');
        this.router.navigate(['/news']);
      },
      error: (err) => {

        toastr.options.positionClass = 'toast-bottom-right';
        toastr.error('Ha ocurrido un error agregando la noticia. Intente de nuevo más tarde');
        
        console.error('Error al agregar noticia', err);
      }
    });
  }
}
