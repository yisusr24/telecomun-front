import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { InvoicesService, Invoice } from '../../models/services/invoices.service';
import { AuthService } from '../../models/services/auth.service';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, NavbarComponent],
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  invoices = signal<Invoice[]>([]);
  loading = true;
  error: string | null = null;
  selected: Invoice | null = null;

  constructor(private inv: InvoicesService, private auth: AuthService) {}

  ngOnInit(): void {
    const user = this.auth.currentUser();
    if (!user?.email) {
      this.error = 'Sesión inválida. Inicie sesión nuevamente.';
      this.loading = false;
      return;
    }

    this.inv.list(user.email).subscribe({
      next: (res) => {
        if (res.code === 200) this.invoices.set(res.data);
        else this.error = res.message || 'Error al cargar facturas';
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar facturas';
        this.loading = false;
      }
    });
  }

  openDetail(factura: Invoice) {
    this.selected = factura;
  }

  closeModal() {
    this.selected = null;
  }

  badgeClass(status: string): string {
    return status === 'PAID' ? 'badge-success'
         : status === 'PENDING' ? 'badge-warning'
         : 'badge-danger';
  }
}