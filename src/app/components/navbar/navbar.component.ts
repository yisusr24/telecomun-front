import { NgIf, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../models/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;
  displayName = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const user = this.authService.currentUser();
    this.isAuthenticated = !!user;

    if (user) {
      // Construye el nombre completo con fallback
      const first = user.firstName || '';
      const last = user.lastName || '';
      this.displayName = this.toTitleCase(`${first} ${last}`.trim() || 'Usuario');
    }
  }

  onLogout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  private toTitleCase(str: string): string {
    return (str || '').toUpperCase();
  }

}
