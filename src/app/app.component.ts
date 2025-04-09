import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackgroundComponent } from "./background/background.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  imports: [BackgroundComponent, RouterOutlet , FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Roomify';
}
