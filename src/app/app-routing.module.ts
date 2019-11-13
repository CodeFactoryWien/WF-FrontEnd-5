import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'
import { AdminComponent } from './admin/admin.component'
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers/auth.guard';
import { Role } from './_models/role';
import { MainsiteComponent } from './mainsite/mainsite.component';

const routes: Routes = [
  {
    path: '',
    component: MainsiteComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'sitelogin',
    component: LoginComponent,
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const AppRoutingModule = RouterModule.forRoot(routes);