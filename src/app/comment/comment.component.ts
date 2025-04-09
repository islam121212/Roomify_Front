import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-comment',
  imports:[FormsModule],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  comments = [
    { user: 'Ali Elnady', text: 'الديكور رهيب جدًا! 🔥' },
    { user: 'Ali Rizk', text: 'Amazing ❤️' }
  ];

  newComment: string = '';

  addComment() {
    if (this.newComment.trim()) {
      this.comments.push({ user: 'You', text: this.newComment });
      this.newComment = ''; // مسح النص بعد إضافة التعليق
    }
  }
}
