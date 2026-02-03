import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NavbarComponent],
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {

  userInput = '';

  prompts = [
    'Explícame qué es la Inteligencia Artificial',
    'Dame un ejemplo práctico de IA',
    '¿En qué se diferencia IA, Machine Learning y Deep Learning?'
  ];

  messages: { sender: 'user' | 'bot'; text: string }[] = [];

  sendPredefined(text: string) {
    this.userInput = text;
    this.sendMessage();
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    const text = this.userInput;
    this.messages.push({ sender: 'user', text });
    this.userInput = '';

    setTimeout(() => {
      this.messages.push({
        sender: 'bot',
        text: this.generateResponse(text)
      });
    }, 600);
  }

  generateResponse(text: string): string {
    if (text.includes('Inteligencia')) {
      return 'La Inteligencia Artificial permite a las máquinas aprender y tomar decisiones similares a las humanas.';
    }
    if (text.includes('ejemplo')) {
      return 'Un ejemplo de IA es el reconocimiento facial o los asistentes virtuales.';
    }
    if (text.includes('diferencia')) {
      return 'IA es el concepto general, ML aprende de datos y DL usa redes neuronales profundas.';
    }
    return 'Estoy procesando tu consulta...';
  }

  /* CALCULADORA */
  calcDisplay = '';
  calcKeys = ['7','8','9','/',
              '4','5','6','*',
              '1','2','3','-',
              '0','.','=','+','C'];

  pressKey(key: string) {
    if (key === 'C') {
      this.calcDisplay = '';
    } else if (key === '=') {
      try {
        this.calcDisplay = eval(this.calcDisplay).toString();
      } catch {
        this.calcDisplay = 'Error';
      }
    } else {
      this.calcDisplay += key;
    }
  }
}
