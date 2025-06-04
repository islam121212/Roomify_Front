import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// تعريف واجهة للتعليق بناءً على استجابة الـ API الفعلية التي قدمتها سابقًا
interface Comment {
  id?: string;
  content: string; // تم التغيير من 'text'
  createdAt: string;
  updatedAt: string | null;
  userId: string;
  userName: string; // تم التغيير من 'user'
  userProfilePicture: string | null; // تم التغيير من 'userProfilePictureUrl'
  portfolioPostId: string;
}

// تعريف واجهة للبوست لتطابق ما تعيده خدمة PostsService
export interface PostDetails {
  id: string;
  imagePath: string;
  description: string;
  createdAt: string;
  applicationUserId: string;
  ownerUserName?: string | null;
  ownerProfilePicture?: string | null;
  title?: string;
  authorName?: string;
}

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  postId: string | null = null;
  comments: Comment[] = [];
  postDetails: PostDetails | null = null;
  newComment: string = '';

  // بيانات المستخدم الحالي
  // ⚠️ مهم جداً: الـ ID هنا يجب أن يأتي من عملية تسجيل الدخول/المستخدم الحالي الحقيقي.
  // هذا الـ ID (fe72adca-8d75-43e1-f750-08dd9d2dd006) هو مجرد مثال.
  currentUser = {
    id: 'fe72adca-8d75-43e1-f750-08dd9d2dd006',
    userName: 'Current User', // يمكنك تغيير هذا ليكون اسم المستخدم الحالي الحقيقي
    profilePicture: '/assets/avatar.png'
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    console.log('CommentComponent constructor called.');
  }

  ngOnInit(): void {
    console.log('ngOnInit called in CommentComponent.');
    this.route.paramMap.subscribe(params => {
      this.postId = params.get('postId');
      console.log('ParamMap subscription: postId =', this.postId);
      if (this.postId) {
        this.fetchComments();
        this.fetchPostDetails(this.postId);
      } else {
        console.error('Post ID is missing in the route. Redirecting to home.');
        this.router.navigate(['/home']);
      }
    });
  }

  fetchComments() {
    if (!this.postId) {
      console.warn('fetchComments called without postId.');
      return;
    }

    const token = localStorage.getItem('token') || '';
    console.log('Fetching comments for postId:', this.postId, 'with token (partial):', token.substring(0, 30) + '...');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // هذا الـ API الخاص بجلب التعليقات ما زال كما هو
    const commentsApiUrl = `http://roomify0.runasp.net/api/Comments/post/${this.postId}`;

    this.http.get<Comment[]>(commentsApiUrl, { headers }).subscribe({
      next: (data) => {
        console.log('API responded with comments data:', data);
        if (Array.isArray(data)) {
          this.comments = data.map(comment => ({
            ...comment,
            userProfilePicture: comment.userProfilePicture || '/assets/jojo.jpg'
          }));
          console.log('Comments array updated after fetch:', this.comments);
        } else {
          console.warn('API response for comments is not an array or is empty:', data);
          this.comments = [];
        }
      },
      error: (error) => {
        console.error('Error fetching comments:', error);
      }
    });
  }

  fetchPostDetails(postId: string) {
    console.log('Fetching post details for postId:', postId);
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const postApiUrl = `http://roomify0.runasp.net/api/PortfolioPost/${postId}`;

    this.http.get<PostDetails>(postApiUrl, { headers }).subscribe({
      next: (data) => {
        this.postDetails = data;
        console.log('Post details fetched from API:', this.postDetails);
        console.log('Image path from API:', this.postDetails?.imagePath);
        console.log('Description from API:', this.postDetails?.description);
      },
      error: (err) => {
        console.error('Error fetching post details from API:', err);
        this.postDetails = {
          id: postId,
          imagePath: '/assets/room1.jpg',
          description: 'فشل تحميل تفاصيل البوست. الرجاء المحاولة لاحقاً.',
          createdAt: new Date().toISOString(),
          applicationUserId: 'unknown'
        };
      }
    });
  }

  addComment() {
    if (this.newComment.trim() && this.postId && this.currentUser.id) {
      console.log('Attempting to add comment:', this.newComment.trim());
      const token = localStorage.getItem('token') || '';
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      // ⚠️ التغيير هنا: بناء الـ URL والـ Payload بناءً على متطلبات الـ API الجديد
      const addCommentApiUrl = `http://roomify0.runasp.net/api/Comments?userId=${this.currentUser.id}`; // ⚠️ إضافة userId كـ Query Parameter

      const commentPayload = {
        content: this.newComment.trim(),        // ⚠️ تغيير اسم الخاصية من CommentText إلى content
        PortfolioPostId: this.postId           // ⚠️ تغيير اسم الخاصية من PostId إلى PortfolioPostId
      };
      console.log('Comment payload to send:', commentPayload);
      console.log('API URL for adding comment:', addCommentApiUrl);

      this.http.post(addCommentApiUrl, commentPayload, { headers }).subscribe({
        next: (response: any) => {
          console.log('Comment added successfully (API response):', response);
          // هنا يجب أن تتأكد من شكل الـ response.
          // إذا كان الـ API يعيد الكومنت الذي تم إنشاؤه بالكامل، استخدمه.
          // وإلا، قم بإنشاء الكومنت يدوياً كما يلي (وهو الأكثر أماناً إذا كان الـ API يعيد فقط تأكيد النجاح):
          this.comments.push({
            id: response.id || new Date().getTime().toString(), // إذا كان الـ API يعيد الـ ID
            content: this.newComment.trim(),
            userName: this.currentUser.userName,
            userProfilePicture: this.currentUser.profilePicture,
            createdAt: new Date().toISOString(),
            updatedAt: null,
            userId: this.currentUser.id,
            portfolioPostId: this.postId!
          });
          this.newComment = ''; // مسح حقل الإدخال بعد الإرسال
          console.log('Local comments array after adding:', this.comments);
          // 💡 بعد إضافة التعليق، قد تحتاج إلى إعادة جلب التعليقات بالكامل لتضمين التعليق الجديد من الـ API
          // وذلك لضمان أن جميع البيانات (مثل createdAt لو تم تعديلها في السيرفر) صحيحة.
          // this.fetchComments(); // 👈 يمكنك تفعيل هذا السطر لإعادة جلب التعليقات بعد الإضافة
        },
        error: (error) => {
          console.error('Error adding comment:', error);
          alert('فشل في إضافة التعليق: ' + (error.error?.message || JSON.stringify(error.error) || 'خطأ غير معروف.'));
        }
      });
    } else {
      console.warn('Cannot add empty comment or missing postId/userId.');
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
