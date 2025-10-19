import { Component, computed, OnInit, signal, inject } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { DashboardService, DetailResponse } from '../../models/services/inicio.service';
import { AuthService } from '../../models/services/auth.service';
import { Estado, SubscriptionSummary } from '../../models/models/subscription-summary.model';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, NavbarComponent],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  // inyecciones (sin constructor)
  private ds = inject(DashboardService);
  private auth = inject(AuthService);

  loading = true;
  error: string | null = null;
  subs = signal<SubscriptionSummary[]>([]);
  detailLoading = false;
  detailError: string | null = null;
  detail: DetailResponse["data"] | null = null;

  internetSubs = computed(() => this.subs().filter(s => s.productType === 'INTERNET'));
  phoneSubs    = computed(() => this.subs().filter(s => s.productType === 'PHONE'));
  tvSubs       = computed(() => this.subs().filter(s => s.productType === 'TV'));

  ngOnInit(): void {
    const user = this.auth.currentUser();
    if (!user?.email) {
      this.error = 'Sesión inválida. Inicie sesión nuevamente.';
      this.loading = false;
      return;
    }

    this.ds.getSubscriptionsByEmail(user.email).subscribe({
      next: (res) => {
        if (res.code === 200 && Array.isArray(res.data)) {
          this.subs.set(res.data);
        } else {
          this.error = res.message || 'No se pudo cargar sus productos';
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar sus productos';
        this.loading = false;
      }
    });
  }

  minutesPercent(usados?: number | null, cuota?: number | null): number {
    if (!cuota || cuota <= 0 || usados == null) return 0;
    const p = Math.round((usados / cuota) * 100);
    return Math.min(100, Math.max(0, p));
  }

  statusBadge(estado: Estado): string {
    return estado === 'ACTIVE' ? 'badge-success'
         : estado === 'SUSPENDED' ? 'badge-warning'
         : 'badge-secondary';
  }

  minUsados(s: SubscriptionSummary): number | null {
    return (s as any).minutesUsed ?? s.consumo?.minutos?.usados ?? null;
  }
  minCuota(s: SubscriptionSummary): number | null {
    return (s as any).minutesQuota ?? s.consumo?.minutos?.cuota ?? null;
  }

  openDetail(s: { subscriptionId: number }) {
    this.detailLoading = true;
    this.detailError = null;
    this.detail = null;

    this.ds.getSubscriptionDetail(s.subscriptionId).subscribe({
      next: (res) => {
        if (res.code === 200 && res.data) {
          this.detail = res.data;
          // abre modal
          const m = document.getElementById('detailModal');
          if (m) (m as any).style.display = 'block';
        } else {
          this.detailError = res.message || 'No se pudo cargar el detalle';
        }
        this.detailLoading = false;
      },
      error: () => {
        this.detailError = 'No se pudo cargar el detalle';
        this.detailLoading = false;
      }
    });
  }

  closeDetail() {
    const m = document.getElementById('detailModal');
    if (m) (m as any).style.display = 'none';
  }
}
