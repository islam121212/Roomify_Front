import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundComponent } from "../../background/background.component";
import { NavbarComponent } from "../../navbar/navbar.component";

@Component({
  selector: 'app-generate',
  standalone: true,
  imports: [CommonModule, BackgroundComponent, NavbarComponent],
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css']
})
export class GenerateComponent {
  showSidebar = false;

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }
}
