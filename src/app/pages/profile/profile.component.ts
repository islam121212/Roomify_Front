import { Component, OnInit, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../../navbar/navbar.component";
import { CommonModule } from '@angular/common';

interface PortfolioPost {
  id: string;
  imagePath: string;
  description: string;
  createdAt: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, NavbarComponent , CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userName: string = 'Demo User';  // اسم ثابت مؤقت
  role: string = 'InteriorDesigner';  // دور ثابت مؤقت
  posts: PortfolioPost[] = [];

  private http = inject(HttpClient);

  ngOnInit() {
    const token = localStorage.getItem('token') || ''; // تأكد من وجود التوكن أو استخدم توكن ثابت هنا إذا تحب
    const userId = 'fe72adca-8d75-43e1-f750-08dd9d2dd006'; // userId اللي فيه بوستات في API

    if (userId && token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.get<PortfolioPost[]>(
        `http://roomify0.runasp.net/api/PortfolioPost/by-user/${userId}`,
        { headers }
      ).subscribe({
        next: (res) => {
          this.posts = res;
          console.log('البيانات المستلمة:', this.posts);
        },
        error: (err) => {
          console.error('حدث خطأ في تحميل الصور:', err);
        }
      });
    } else {
      console.warn('توكن أو معرف المستخدم غير موجود');
    }
  }
}
