import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton
} from '@ionic/angular/standalone';

/* ======================
   TIPOS (FALTABAN)
====================== */
type TipoDrag = 'pregunta' | 'fragment';

interface Pregunta {
  q: string;
  a: string;
}

interface Fragmento {
  name: string;
  link: string;
}

@Component({
  selector: 'app-imagenes',
  standalone: true,
  templateUrl: './imagenes.page.html',
  styleUrls: ['./imagenes.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton
  ]
})
export class ImagenesPage {

  /* ======================
     ESTADO
  ===================== */
  dragTipo: TipoDrag | null = null;
  dragValor = '';
  dragLink = '';

  respuestaTexto = '';
  respuestaImagen = '';

  preguntasActuales: Pregunta[] = [];
  fragmentosActuales: Fragmento[] = [];

  /* ======================
     DATA (TU INFO)
  ===================== */
  preguntas: Record<string, Pregunta[]> = {
    matematicas: [
      { q: 'Qué es álgebra', a: 'El álgebra estudia operaciones y relaciones entre símbolos y letras.' },
      { q: 'Qué es cálculo', a: 'El cálculo estudia derivadas, integrales y tasas de cambio.' },
      { q: 'Teorema de Pitágoras', a: 'a² + b² = c² en un triángulo rectángulo.' }
    ],
    programacion: [
      { q: 'Qué es JavaScript', a: 'Lenguaje interpretado para web interactiva.' },
      { q: 'Qué es Python', a: 'Lenguaje versátil usado en IA y ciencia de datos.' }
    ],
    ia: [
      { q: 'Qué es IA', a: 'Sistemas capaces de realizar tareas que requieren inteligencia humana.' }
    ],
    chatgpt: [
      { q: 'Qué es ChatGPT', a: 'Modelo de lenguaje de OpenAI.' }
    ],
    gemini: [
      { q: 'Qué es Gemini', a: 'IA multimodal de Google.' }
    ]
  };

  fragmentos: Record<string, Fragmento[]> = {
    dragonball: [
      { name: 'Goku Super Saiyajin', link: 'https://i.imgur.com/5ZCzR2x.jpg' }
    ],
    futbol: [
      { name: 'Messi Gol', link: 'https://i.imgur.com/r9FJm0p.jpg' }
    ],
    otros: [
      { name: 'Naruto Rasengan', link: 'https://i.imgur.com/nzYpZbY.jpg' }
    ],
    memes: [
      { name: 'Meme Troll', link: 'https://i.imgur.com/YkY4F0Z.jpg' }
    ]
  };

  /* ======================
     MÉTODOS
  ===================== */
  showQuestions(cat: string) {
    this.preguntasActuales = this.preguntas[cat] || [];
  }

  showFragments(cat: string) {
    this.fragmentosActuales = this.fragmentos[cat] || [];
  }

  startDragPregunta(p: Pregunta) {
    this.dragTipo = 'pregunta';
    this.dragValor = p.q;
  }

  startDragFragmento(f: Fragmento) {
    this.dragTipo = 'fragment';
    this.dragValor = f.name;
    this.dragLink = f.link;
  }

  procesar() {
    this.respuestaTexto = '';
    this.respuestaImagen = '';

    if (!this.dragTipo) return;

    if (this.dragTipo === 'pregunta') {
      for (const grupo of Object.values(this.preguntas)) {
        const encontrada = grupo.find(p => p.q === this.dragValor);
        if (encontrada) {
          this.respuestaTexto = encontrada.a;
          break;
        }
      }
    }

    if (this.dragTipo === 'fragment') {
      this.respuestaImagen = this.dragLink;
    }

    this.dragTipo = null;
    this.dragValor = '';
    this.dragLink = '';
  }
}
