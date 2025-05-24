import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  messages = [
    {
      sender: 'Ali Ellebi',
      content: 'Hi bro, how are you?',
      time: '08:20 AM',
      isMine: false
    },
    {
      sender: 'Me',
      content: 'Hi bro, how are you?',
      time: '08:20 AM',
      isMine: true
    },
    {
      sender: 'Me',
      content: 'Hi bro, how are you?',
      time: '08:20 AM',
      isMine: true
    }
  ];
}
