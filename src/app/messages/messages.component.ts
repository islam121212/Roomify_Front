import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllUsersService } from '../services/all-users.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule], // ✅ أضف CommonModule هنا
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  users: any[] = [];

  constructor(private allUsersService: AllUsersService) {}

  ngOnInit() {
    this.allUsersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }
}
