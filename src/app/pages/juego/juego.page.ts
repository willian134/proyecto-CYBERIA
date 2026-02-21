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
{ pregunta:"¿Qué es una variable?", opciones:["Un contenedor de datos","Un número","Un botón","Un color"], correcta:0 },
{ pregunta:"¿Qué es HTML?", opciones:["Lenguaje de programación","Lenguaje de marcado","Sistema operativo","Juego"], correcta:1 },
{ pregunta:"¿Qué es CSS?", opciones:["Un servidor","Un framework","Hojas de estilo","Un navegador"], correcta:2 },
{ pregunta:"¿Qué es JavaScript?", opciones:["Lenguaje de estilos","Lenguaje de programación","Sistema operativo","Editor"], correcta:1 },
{ pregunta:"¿Qué es una función?", opciones:["Un botón","Un bloque de código reutilizable","Un color","Un archivo"], correcta:1 },
{ pregunta:"¿Qué es una IA?", opciones:["Un virus","Una base de datos","Una inteligencia artificial","Un juego"], correcta:2 },
{ pregunta:"¿Qué significa CPU?", opciones:["Unidad Central de Procesamiento","Computadora Personal Unificada","Centro de Procesos","Control Principal"], correcta:0 },
{ pregunta:"¿Qué es un navegador?", opciones:["Un lenguaje","Un programa para navegar internet","Un servidor","Un virus"], correcta:1 },
{ pregunta:"¿Qué es un servidor?", opciones:["Una computadora que da servicios","Un celular","Un navegador","Un juego"], correcta:0 },
{ pregunta:"¿Qué es una base de datos?", opciones:["Un archivo","Un conjunto de datos","Un juego","Un navegador"], correcta:1 },

{ pregunta:"¿Qué es un algoritmo?", opciones:["Una receta de pasos","Un error","Un color","Un botón"], correcta:0 },
{ pregunta:"¿Qué es Git?", opciones:["Un videojuego","Un sistema de control de versiones","Un navegador","Un lenguaje"], correcta:1 },
{ pregunta:"¿Qué es GitHub?", opciones:["Un editor","Una nube de código","Un sistema operativo","Un antivirus"], correcta:1 },
{ pregunta:"¿Qué es una API?", opciones:["Un puente entre programas","Un virus","Un lenguaje","Un juego"], correcta:0 },
{ pregunta:"¿Qué es TypeScript?", opciones:["Un navegador","Una versión de JavaScript","Un juego","Un servidor"], correcta:1 },
{ pregunta:"¿Qué es Ionic?", opciones:["Un framework","Un navegador","Un lenguaje","Un sistema"], correcta:0 },
{ pregunta:"¿Qué es Angular?", opciones:["Un framework","Un antivirus","Un color","Un disco"], correcta:0 },
{ pregunta:"¿Qué es un bug?", opciones:["Un error","Un animal","Un botón","Un archivo"], correcta:0 },
{ pregunta:"¿Qué es depurar?", opciones:["Eliminar errores","Borrar archivos","Cambiar color","Instalar"], correcta:0 },
{ pregunta:"¿Qué es un loop?", opciones:["Un ciclo","Un botón","Un error","Un archivo"], correcta:0 },

{ pregunta:"¿Qué es una condición?", opciones:["Una decisión","Un error","Un archivo","Un botón"], correcta:0 },
{ pregunta:"¿Qué es if?", opciones:["Una condición","Un número","Un color","Un juego"], correcta:0 },
{ pregunta:"¿Qué es una clase?", opciones:["Un grupo de objetos","Un error","Un botón","Un color"], correcta:0 },
{ pregunta:"¿Qué es un objeto?", opciones:["Algo con datos y funciones","Un número","Un color","Un botón"], correcta:0 },
{ pregunta:"¿Qué es JSON?", opciones:["Formato de datos","Un navegador","Un lenguaje","Un virus"], correcta:0 },
{ pregunta:"¿Qué es una IP?", opciones:["Dirección en red","Un error","Un juego","Un lenguaje"], correcta:0 },
{ pregunta:"¿Qué es una URL?", opciones:["Dirección web","Un error","Un archivo","Un virus"], correcta:0 },
{ pregunta:"¿Qué es una app?", opciones:["Una aplicación","Un virus","Un navegador","Un color"], correcta:0 },
{ pregunta:"¿Qué es Android?", opciones:["Un sistema operativo","Un virus","Un lenguaje","Un navegador"], correcta:0 },
{ pregunta:"¿Qué es iOS?", opciones:["Un sistema operativo","Un juego","Un servidor","Un error"], correcta:0 },

{ pregunta:"¿Qué es WiFi?", opciones:["Red inalámbrica","Un virus","Un archivo","Un juego"], correcta:0 },
{ pregunta:"¿Qué es Bluetooth?", opciones:["Tecnología inalámbrica","Un color","Un error","Un lenguaje"], correcta:0 },
{ pregunta:"¿Qué es un pixel?", opciones:["Un punto de imagen","Un error","Un virus","Un botón"], correcta:0 },
{ pregunta:"¿Qué es una nube?", opciones:["Almacenamiento online","Un clima","Un error","Un virus"], correcta:0 },
{ pregunta:"¿Qué es una red?", opciones:["Computadoras conectadas","Un archivo","Un juego","Un botón"], correcta:0 },
{ pregunta:"¿Qué es un firewall?", opciones:["Protección de red","Un juego","Un navegador","Un archivo"], correcta:0 },
{ pregunta:"¿Qué es hacking ético?", opciones:["Seguridad informática","Un virus","Un juego","Un error"], correcta:0 },
{ pregunta:"¿Qué es phishing?", opciones:["Robo de datos","Un juego","Un lenguaje","Un archivo"], correcta:0 },
{ pregunta:"¿Qué es malware?", opciones:["Software malicioso","Un navegador","Un juego","Un archivo"], correcta:0 },
{ pregunta:"¿Qué es un antivirus?", opciones:["Protector","Un virus","Un navegador","Un juego"], correcta:0 },

{ pregunta:"¿Qué es una carpeta?", opciones:["Un contenedor","Un virus","Un color","Un botón"], correcta:0 },
{ pregunta:"¿Qué es un archivo?", opciones:["Información guardada","Un virus","Un navegador","Un juego"], correcta:0 },
{ pregunta:"¿Qué es un byte?", opciones:["Unidad de datos","Un error","Un color","Un botón"], correcta:0 },
{ pregunta:"¿Qué es un bit?", opciones:["0 o 1","Un archivo","Un virus","Un color"], correcta:0 },
{ pregunta:"¿Qué es una RAM?", opciones:["Memoria temporal","Un virus","Un navegador","Un juego"], correcta:0 },
{ pregunta:"¿Qué es un disco duro?", opciones:["Almacenamiento","Un error","Un navegador","Un juego"], correcta:0 },
{ pregunta:"¿Qué es una GPU?", opciones:["Procesador gráfico","Un error","Un virus","Un archivo"], correcta:0 },
{ pregunta:"¿Qué es una app web?", opciones:["Aplicación en navegador","Un juego","Un virus","Un error"], correcta:0 },
{ pregunta:"¿Qué es backend?", opciones:["Parte del servidor","Un color","Un botón","Un error"], correcta:0 },
{ pregunta:"¿Qué es frontend?", opciones:["Parte visual","Un servidor","Un virus","Un error"], correcta:0 },

{ pregunta:"¿Qué es una variable booleana?", opciones:["Verdadero o falso","Un número","Un color","Un archivo"], correcta:0 },
{ pregunta:"¿Qué es un string?", opciones:["Texto","Un número","Un botón","Un error"], correcta:0 },
{ pregunta:"¿Qué es un array?", opciones:["Lista de datos","Un virus","Un botón","Un color"], correcta:0 },
{ pregunta:"¿Qué es un framework?", opciones:["Herramienta de desarrollo","Un virus","Un color","Un archivo"], correcta:0 },
{ pregunta:"¿Qué es un software?", opciones:["Programa","Un virus","Un archivo","Un botón"], correcta:0 },
{ pregunta:"¿Qué es un hardware?", opciones:["Parte física","Un virus","Un navegador","Un juego"], correcta:0 },
{ pregunta:"¿Qué es código abierto?", opciones:["Software libre","Un virus","Un error","Un botón"], correcta:0 },
{ pregunta:"¿Qué es una licencia?", opciones:["Permiso de uso","Un virus","Un archivo","Un botón"], correcta:0 },
{ pregunta:"¿Qué es una actualización?", opciones:["Mejora","Un error","Un virus","Un botón"], correcta:0 },
{ pregunta:"¿Qué es una IA generativa?", opciones:["IA que crea","Un virus","Un juego","Un error"], correcta:0 },

{ pregunta:"¿Qué es ChatGPT?", opciones:["Una IA conversacional","Un juego","Un virus","Un navegador"], correcta:0 },
{ pregunta:"¿Qué es un prompt?", opciones:["Instrucción a la IA","Un error","Un botón","Un color"], correcta:0 },
{ pregunta:"¿Qué es machine learning?", opciones:["Aprendizaje automático","Un virus","Un juego","Un archivo"], correcta:0 },
{ pregunta:"¿Qué es deep learning?", opciones:["Redes neuronales","Un navegador","Un botón","Un error"], correcta:0 },
{ pregunta:"¿Qué es una red neuronal?", opciones:["Modelo de IA","Un virus","Un archivo","Un botón"], correcta:0 },
{ pregunta:"¿Qué es reconocimiento facial?", opciones:["Identificar rostros","Un virus","Un juego","Un error"], correcta:0 },
{ pregunta:"¿Qué es un chatbot?", opciones:["IA que conversa","Un virus","Un juego","Un error"], correcta:0 },
{ pregunta:"¿Qué es automatización?", opciones:["Hacer tareas solas","Un error","Un virus","Un botón"], correcta:0 },
{ pregunta:"¿Qué es big data?", opciones:["Muchos datos","Un virus","Un juego","Un archivo"], correcta:0 },
{ pregunta:"¿Qué es la nube?", opciones:["Datos online","Un virus","Un botón","Un error"], correcta:0 }
];
