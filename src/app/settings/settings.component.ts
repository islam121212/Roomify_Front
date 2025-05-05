import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterModule], // ✅ صح
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'] // ✅ جمع مش مفرد
})
export class SettingsComponent {

  constructor(private router: Router) {} // ✅ لازم الـ constructor

  goToSettings() {
    this.router.navigate(['/changepass']);
  }

  goHome() {
    this.router.navigate(['/home']);
  }

}
