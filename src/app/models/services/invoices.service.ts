import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Invoice {
  invoiceId: number;
  subscriptionId: number;
  productType: string;
  productName: string;
  planName: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  notes?: string;
}

export interface ApiResponse<T> {
  code: number;
  status: string;
  message: string;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class InvoicesService {
  private api = environment.baseApi;

  constructor(private http: HttpClient) {}

  list(email: string): Observable<ApiResponse<Invoice[]>> {
    return this.http.post<ApiResponse<Invoice[]>>(`${this.api}/invoices/list`, { email });
  }
}
