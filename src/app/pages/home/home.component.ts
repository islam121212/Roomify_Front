import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { PostsService } from './../../services/posts.service';
import { Component, OnInit } from '@angular/core';
import type { Post } from '../../services/posts.service';
import { BackgroundComponent } from "../../background/background.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule, BackgroundComponent], // ✅ ضيفهم هنا
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.getAllPosts().subscribe((res) => {
      this.posts = res;
    });
  }
}
