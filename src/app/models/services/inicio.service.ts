import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SubscriptionSummary } from '../models/subscription-summary.model';

export interface InicioResponse {
  code: number;
  status: string;
  message?: string;
  data: SubscriptionSummary[];
}

export interface DetailResponse {
  code: number;
  status: string;
  message?: string;
  data: {
    subscriptionId: number;
    productType: 'INTERNET' | 'PHONE' | 'TV';
    productName: string;
    planName: string;
    monthlyFee: number;
    saldo: number;
    estado: 'ACTIVE' | 'SUSPENDED' | 'CANCELLED';
    ultimaActualizacion: string | null;
    internet?: { speedMbps?: number | null; dataQuotaMb?: number | null; dataUsedMb?: number | null; dataPercent?: number | null; };
    phone?:    { minutesQuota?: number | null; minutesUsed?: number | null; minutesPercent?: number | null; };
    tv?:       { addons: { name: string; monthlyFee: number }[] };
  };
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private api = environment.baseApi;

  constructor(private http: HttpClient) {}

  getSubscriptionsByEmail(email: string): Observable<InicioResponse> {
    return this.http.post<InicioResponse>(`${this.api}/subscriptions/list`, { email });
  }

  getSubscriptionDetail(id: number): Observable<DetailResponse> {
    return this.http.post<DetailResponse>(`${this.api}/subscriptions/detail`, { subscriptionId: id });
  }

}
