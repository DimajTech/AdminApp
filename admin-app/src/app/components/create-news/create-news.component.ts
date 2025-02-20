import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-news',
  imports: [RouterLink],
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent {
  previewImage: string = '/images/istockphoto-1128826884-612x612.jpg'; // Imagen por defecto
  fileName: string = 'Sin archivos seleccionados';

  previewSelectedImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.fileName = file.name; // Actualiza el nombre del archivo seleccionado

      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result as string; // Asigna la imagen a la vista previa
      };

      reader.readAsDataURL(file); // Convierte la imagen a base64
    }
  }
}
