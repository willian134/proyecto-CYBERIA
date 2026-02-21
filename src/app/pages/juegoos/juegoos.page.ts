import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-juegoos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './juegoos.page.html',
  styleUrls: ['./juegoos.page.scss'],
})
export class JuegoosPage {



  // ======================
  // CONTROL DE PANTALLAS
  // ======================

  showMenu = true;
  showGame = false;
  showQuestion = false;

  // ======================
  // NIVELES
  // ======================

  levels = [1, 2, 3];
  currentLevel = 0;

  // ======================
  // PREGUNTAS
  // ======================

  questionText = '';
  options: string[] = [];
  correctAnswer = 0;

  // ======================
  // BANCO DE PREGUNTAS
  // ======================

  preguntas: any = {
    1: {
      texto: '¿Qué significa IA?',
      opciones: [
        'Inteligencia Artificial',
        'Internet Avanzado',
        'Información Automática'
      ],
      correcta: 0
    },

    2: {
      texto: '¿Cuál lenguaje usa IA?',
      opciones: [
        'Python',
        'HTML',
        'CSS'
      ],
      correcta: 0
    },

    3: {
      texto: '¿IA puede aprender?',
      opciones: [
        'Sí',
        'No',
        'Solo videojuegos'
      ],
      correcta: 0
    }
  };

  // ======================
  // INICIAR NIVEL
  // ======================

  startLevel(level: number) {

    this.currentLevel = level;

    const pregunta = this.preguntas[level];

    this.questionText = pregunta.texto;
    this.options = pregunta.opciones;
    this.correctAnswer = pregunta.correcta;

    this.showMenu = false;
    this.showGame = false;
    this.showQuestion = true;
  }

  // ======================
  // RESPONDER
  // ======================

  answer(index: number) {

    if (index === this.correctAnswer) {
      alert('✅ Correcto');
    } else {
      alert('❌ Incorrecto');
    }

    this.volverMenu();
  }

  // ======================
  // VOLVER MENU
  // ======================

  volverMenu() {
    this.showMenu = true;
    this.showGame = false;
    this.showQuestion = false;
  }

}
