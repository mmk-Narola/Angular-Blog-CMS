import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { GuardGuard } from './guard/guard.guard';
import { BlogComponent } from './components/blog/blog.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { BlogCardComponent } from './layout/blog-card/blog-card.component';
import { MainBlogComponent } from './layout/main-blog/main-blog.component';
import { BlogDetailsComponent } from './layout/blog-details/blog-details.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'dashboard',
    component: HeaderComponent,
    canActivate: [GuardGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'addblog',
        component: BlogComponent,
      },
      {
        path: 'editblog/:id',
        component: BlogComponent,
      },
      {
        path: 'profile',
        component: UserProfileComponent,
      },
    ],
  },
  {
    path: '',
    component: MainBlogComponent,
  },
  {
    path: 'blog/:id',
    component: BlogDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
