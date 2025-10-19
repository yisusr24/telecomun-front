import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from '../../models/services/auth.service';
import { LoginResponse } from '../../models/models/auth/login-response.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';
  isLoading = false;

  constructor(private auth: AuthService, private router: Router) {}

  onLogin(event: Event) {
    event.preventDefault();

    if (!this.email || !this.password) {
      Swal.fire('Error', 'Ingrese email y contraseña', 'error');
      return;
    }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.email)) {
    Swal.fire('Error', 'Ingrese un correo electrónico válido', 'error');
    return;
  }


    this.isLoading = true;

    this.auth.login(this.email, this.password).subscribe({
      next: (res: LoginResponse) => {
        this.isLoading = false;
        if (res?.code === 200) {
          this.router.navigate(['/inicio']);
        } else {
          Swal.fire('Error', res?.message || 'Credenciales inválidas', 'error');
        }
      },
      error: () => {
        this.isLoading = false;
        Swal.fire('Error', 'Credenciales incorrectas', 'error');
      }
    });
  }
}
