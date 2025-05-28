import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../../navbar/navbar.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, NavbarComponent],  // ← هنا ضفت RouterModule
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userName: string = '';
  role: string = '';

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.userName = user.userName || '';
      this.role = user.roles || 'InteriorDesigner';
    }
  }
}
