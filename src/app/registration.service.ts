import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private baseUrl = 'http://roomify.runasp.net/api/Auth';

  constructor(private http: HttpClient) {}

  register(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, payload);
  }
}
