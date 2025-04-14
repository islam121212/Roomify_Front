import { ChangePasswordComponent } from './change-password/change-password.component';
import { SettingsComponent } from './settings/settings.component';
import { CommentComponent } from './comment/comment.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { GenerateComponent } from './pages/generate/generate.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent},
    { path: 'generate', component: GenerateComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'comment', component: CommentComponent},
    { path: 'settings', component: SettingsComponent},
    { path: 'changepass', component: ChangePasswordComponent},

    { path: '', redirectTo: '/register', pathMatch: 'full' }
];
