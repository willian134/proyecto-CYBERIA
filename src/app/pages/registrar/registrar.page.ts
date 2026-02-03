import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegistrarPage {

  name: string = '';
  email: string = '';
  pass: string = '';
  confirm: string = '';

  constructor(private router: Router) {}

  registrar() {

    if (this.pass !== this.confirm) {
      alert("Las contraseñas no coinciden");
      return;
    }

    localStorage.setItem("name", this.name);
    localStorage.setItem("email", this.email);
    localStorage.setItem("pass", this.pass);

    alert("Registro exitoso");

    this.router.navigate(['/login']);
  }

}
