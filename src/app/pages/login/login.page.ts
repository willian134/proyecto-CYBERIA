import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email = '';
  pass = '';
  msg = '';

  login() {
    const savedEmail = localStorage.getItem('email');
    const savedPass = localStorage.getItem('pass');

    if (this.email === savedEmail && this.pass === savedPass) {
      alert('Bienvenido');
      window.location.href = 'inicio'; // o '/inicio' según tu app
    } else {
      this.msg = 'Datos incorrectos';
    }
  }
}
