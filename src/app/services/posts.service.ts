import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Post {
  id: string;
  imagePath: string;
  description: string;
  createdAt: string;
  applicationUserId: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = 'http://roomify.runasp.net/api/PortfolioPost/'; // ✳️ غيّر الرابط حسب رابط الـ API الحقيقي

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }
}
