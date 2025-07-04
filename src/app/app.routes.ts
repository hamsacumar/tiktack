import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BoardComponent } from './board/board.component';

export const routes: Routes = [
     {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'play',
    component: BoardComponent
  },
];
