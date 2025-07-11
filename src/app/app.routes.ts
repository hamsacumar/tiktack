import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BoardComponent } from './board/board.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { 
    path: 'register', 
    component: RegisterComponent 
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'play',
    component: BoardComponent,
    canActivate: [AuthGuard]
  },
];