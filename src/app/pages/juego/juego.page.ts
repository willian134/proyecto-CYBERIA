import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-juego',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    NavbarComponent
  ],
  templateUrl: './juego.page.html',
  styleUrls: ['./juego.page.scss'],
})
export class JuegoPage {

  // ===== ESTADO GENERAL =====
  pantalla: 'inicio' | 'juego' = 'inicio';

  turno = 0; // 0 = Goku | 1 = Vegeta / CPU
  posiciones = [1, 1];
  dado = 0;

  puedeLanzar = true;
  esperandoRespuesta = false;
  modoJuego: '2p' | 'cpu' = '2p';

  tablero = Array(100).fill(0);

  // ===== PREGUNTAS =====
  mostrarPregunta = false;
  feedback = '';
  preguntaActual: any = null;

  turnoTexto = 'Turno: Goku';

  preguntas = [...BANCO_PREGUNTAS].sort(() => Math.random() - 0.5);

  // ===== INICIAR JUEGO =====
  iniciarJuego(modo: '2p' | 'cpu') {
    this.modoJuego = modo;
    this.pantalla = 'juego';
    this.turno = 0;
    this.posiciones = [1, 1];
    this.turnoTexto = 'Turno: Goku';
  }

  // ===== DADO =====
  lanzarDado() {
    if (!this.puedeLanzar) return;

    this.puedeLanzar = false;
    this.esperandoRespuesta = true;

    this.dado = Math.floor(Math.random() * 6) + 1;
    this.mostrarPreguntaFn();
  }

  // ===== MOSTRAR PREGUNTA =====
  mostrarPreguntaFn() {
    this.preguntaActual = this.preguntas[this.posiciones[this.turno] - 1];
    this.feedback = '';
    this.mostrarPregunta = true;

    // 🤖 TURNO CPU
    if (this.modoJuego === 'cpu' && this.turno === 1) {
      setTimeout(() => this.respuestaMaquina(), 1000);
    }
  }

  // ===== RESPUESTA HUMANO =====
  responder(i: number) {
    if (!this.esperandoRespuesta) return;
    this.procesarRespuesta(i);
  }

  // ===== RESPUESTA CPU =====
  respuestaMaquina() {
    const acierta = Math.random() < 0.6;
    const seleccion = acierta
      ? this.preguntaActual.correcta
      : Math.floor(Math.random() * 4);

    this.procesarRespuesta(seleccion);
  }

  // ===== PROCESAR RESPUESTA =====
  procesarRespuesta(seleccion: number) {
    this.esperandoRespuesta = false;

    if (seleccion === this.preguntaActual.correcta) {
      this.posiciones[this.turno] += this.dado;
      this.feedback = '✅ Correcto';
    } else {
      this.feedback = '❌ Incorrecto. ' + this.preguntaActual.retroIncorrecta;
    }

    if (this.posiciones[this.turno] >= 100) {
      alert(`🏆 ¡Ganó ${this.turno === 0 ? 'Goku' : 'Vegeta'}!`);
      return;
    }

    setTimeout(() => {
      this.mostrarPregunta = false;

      this.turno = (this.turno + 1) % 2;
      this.turnoTexto =
        'Turno: ' +
        (this.turno === 0
          ? 'Goku'
          : this.modoJuego === 'cpu'
          ? 'Máquina'
          : 'Vegeta');

      this.puedeLanzar = true;

      if (this.modoJuego === 'cpu' && this.turno === 1) {
        setTimeout(() => this.lanzarDado(), 800);
      }
    }, 1500);
  }
}

// ===== BANCO DE PREGUNTAS (RECORTA O PEGA TODO EL TUYO) =====
const BANCO_PREGUNTAS = [
  {
    pregunta: '¿Qué es la Inteligencia Artificial?',
    opciones: [
      'Simulación de la inteligencia humana por máquinas',
      'Un lenguaje de programación',
      'Un sistema operativo',
      'Un componente físico'
    ],
    correcta: 0,
    retroIncorrecta: 'La IA imita capacidades humanas.'
  },
  {
    pregunta: '¿Qué es Machine Learning?',
    opciones: [
      'Aprendizaje automático a partir de datos',
      'Diseño gráfico',
      'Hardware',
      'Redes físicas'
    ],
    correcta: 0,
    retroIncorrecta: 'Machine Learning aprende con datos.'
  }
];
