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
  userName: string = 'Demo User';
  role: string = 'InteriorDesigner';
  posts: PortfolioPost[] = [];
  isHeartLiked: boolean = false;
  selectedPostId: string | null = null; // لتخزين id الصورة المحددة
  showOptions: boolean = false; // لعرض/إخفاء القائمة

  private http = inject(HttpClient);

  ngOnInit() {
    const token = localStorage.getItem('token') || '';
    const userId = 'fe72adca-8d75-43e1-f750-08dd9d2dd006'; // تأكد إن ده الـ userId اللي بتجيب بيه البوستات

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
          // لو في مشكلة في تحميل البوستات، ممكن تعرض رسالة للمستخدم
        }
      });
    } else {
      console.warn('توكن أو معرف المستخدم غير موجود');
      // ممكن توجيه المستخدم لصفحة تسجيل الدخول لو مفيش توكن
    }
  }

  toggleHeartLike() {
    this.isHeartLiked = !this.isHeartLiked;
  }

  toggleOptions(postId: string) {
    // لو بتدوس على نفس البوست اللي القائمة بتاعته مفتوحة، اقفل القائمة
    if (this.selectedPostId === postId) {
      this.showOptions = !this.showOptions;
    } else { // لو بتدوس على بوست جديد، افتح القائمة بتاعت البوست الجديد
      this.selectedPostId = postId;
      this.showOptions = true;
    }
  }

  downloadImage() {
    if (this.selectedPostId) {
      const postToDownload = this.posts.find(p => p.id === this.selectedPostId);
      if (postToDownload && postToDownload.imagePath) {
        // طريقة بسيطة للتنزيل: فتح الصورة في تاب جديد
        window.open(postToDownload.imagePath, '_blank');
        // لو عاوز تنزيل مباشر (download attribute)، محتاج يكون السيرفر بيدعم CORS أو تستخدم backend proxy
        // let a = document.createElement('a');
        // a.href = postToDownload.imagePath;
        // a.download = 'image_' + this.selectedPostId; // اسم الملف اللي هينزل بيه
        // document.body.appendChild(a);
        // a.click();
        // document.body.removeChild(a);
      } else {
        console.warn('مسار الصورة غير موجود للتنزيل.');
        alert('لا يمكن تنزيل هذه الصورة حالياً.');
      }
    } else {
      console.warn('لم يتم تحديد بوست لتنزيله.');
    }
    this.showOptions = false; // إخفاء القائمة بعد الإجراء
  }

  saveImage() {
    if (this.selectedPostId) {
      console.log('جاري حفظ الصورة للبوست صاحب الـ ID:', this.selectedPostId);
      alert('تم حفظ الصورة في المفضلة (وظيفة وهمية).');
      // هنا ممكن تستدعي API خاص بحفظ البوستات المفضلة للمستخدم
      // مثال: this.http.post('http://roomify0.runasp.net/api/FavoritePosts/Add', { userId: 'current_user_id', postId: this.selectedPostId }, { headers }).subscribe(...);
    } else {
      console.warn('لم يتم تحديد بوست لحفظه.');
    }
    this.showOptions = false; // إخفاء القائمة بعد الإجراء
  }

  // **** أهم تعديل هنا: دالة حذف البوست ****
  deleteImage() {
    if (!this.selectedPostId) {
      console.warn('لم يتم تحديد بوست لحذفه.');
      return;
    }

    const token = localStorage.getItem('token') || '';
    if (!token) {
      alert('لا يوجد توكن مصادقة. الرجاء تسجيل الدخول.');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const deleteUrl = `http://roomify0.runasp.net/api/PortfolioPost/${this.selectedPostId}`;

    // تأكيد قبل الحذف
    if (confirm('هل أنت متأكد أنك تريد حذف هذا البوست؟')) {
      this.http.delete(deleteUrl, { headers }).subscribe({
        next: (res) => {
          console.log('تم حذف البوست بنجاح:', res);
          alert('تم حذف البوست بنجاح.');
          // تحديث قائمة البوستات في الواجهة لإزالة البوست المحذوف
          this.posts = this.posts.filter(post => post.id !== this.selectedPostId);
          this.selectedPostId = null; // إعادة تعيين الـ ID المحدد
        },
        error: (err) => {
          console.error('حدث خطأ أثناء حذف البوست:', err);
          alert('فشل حذف البوست: ' + (err.error?.message || 'خطأ غير معروف'));
        }
      });
    }
    this.showOptions = false; // إخفاء القائمة بعد الإجراء (سواء تم الحذف أو لا)
  }
}
