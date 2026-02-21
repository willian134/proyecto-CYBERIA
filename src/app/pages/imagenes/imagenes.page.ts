import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "src/app/components/navbar/navbar.component";

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.page.html',
  styleUrls: ['./imagenes.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NavbarComponent
]//
})
export class ImagenesPage {

  prompt: string = '';
  mensajes: { tipo: 'user' | 'ai', texto: string }[] = [];

  enviarPrompt() {
    if (!this.prompt.trim()) return;

    this.mensajes.push({
      tipo: 'user',
      texto: this.prompt
    });

    const respuesta =
      this.prompt.length < 60
        ? '❌ Prompt débil: falta contexto, rol u objetivo.'
        : '✅ Buen prompt: claro, estructurado y bien formulado.';

    this.mensajes.push({
      tipo: 'ai',
      texto: respuesta
    });

    this.prompt = '';
  }
}
