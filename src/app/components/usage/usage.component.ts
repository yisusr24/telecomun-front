import { Component, OnInit, OnDestroy, signal, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, NgIf, NgFor, DatePipe } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { UsageService, UsagePoint } from '../../models/services/usage.service';
import { AuthService } from '../../models/services/auth.service';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Legend, Tooltip } from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Legend, Tooltip);

@Component({
  selector: 'app-usage',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, NavbarComponent, DatePipe],
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.css']
})
export class UsageComponent implements OnInit, OnDestroy {
  loading = true;
  error: string | null = null;
  data = signal<UsagePoint[]>([]);
  private chart?: Chart;

  @ViewChild('usageChart') canvasRef?: ElementRef<HTMLCanvasElement>;

  constructor(
    private svc: UsageService,
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const user = this.auth.currentUser();
    if (!user?.email) { this.error = 'Sesión inválida'; this.loading = false; return; }

    this.svc.history(user.email, 'PHONE').subscribe({
      next: (res) => {
        if (res.code === 200) {
          const ordered = [...res.data].sort((a, b) => (a.month || '').localeCompare(b.month || ''));
          this.data.set(ordered);

          this.loading = false;
          this.cdr.detectChanges(); 

          if (ordered.length) {
            setTimeout(() => this.renderChart(), 0);
          }
        } else {
          this.error = res.message || 'No se pudo cargar el histórico';
          this.loading = false;
        }
      },
      error: () => { this.error = 'No se pudo cargar el histórico'; this.loading = false; }
    });
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }
  }

  private renderChart(): void {
    const labels = this.data().map(d => (d.month ?? '').substring(0, 7)); 
    const phone  = this.data().map(d => d.phoneMinutes || 0);

    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;

    if (this.chart) this.chart.destroy();

    this.chart = new Chart(canvas.getContext('2d')!, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label: 'Telefonía (min)', data: phone }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'top' } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }
}
