import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface UsagePoint { month: string; internetMb: number; phoneMinutes: number; }
export interface ApiResponse<T> { code:number; status:string; message:string; data:T; }

@Injectable({ providedIn: 'root' })
export class UsageService {
  private api = environment.baseApi;
  constructor(private http: HttpClient) {}
  history(email: string, productType?: 'INTERNET'|'PHONE'): Observable<ApiResponse<UsagePoint[]>> {
    const body: any = { email };
    if (productType) body.productType = productType;
    return this.http.post<ApiResponse<UsagePoint[]>>(`${this.api}/usage/history`, body);
  }
}
