import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from './ng-material/ng-material.module';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CustomInterceptor } from './core/custom.interceptor';
import { DemoComponent } from './components/demo/demo.component';
import { BlogComponent } from './components/blog/blog.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { BlogCardComponent } from './layout/blog-card/blog-card.component';
import { BlogHeaderComponent } from './layout/blog-header/blog-header.component';
import { MainBlogComponent } from './layout/main-blog/main-blog.component';
import { BlogDetailsComponent } from './layout/blog-details/blog-details.component';
import { PostCommentsComponent } from './layout/post-comments/post-comments.component';
import { CommentsComponent } from './layout/comments/comments.component';
import { LikeCommentComponent } from './layout/like-comment/like-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    DemoComponent,
    BlogComponent,
    FooterComponent,
    DashboardComponent,
    UserProfileComponent,
    BlogCardComponent,
    BlogHeaderComponent,
    MainBlogComponent,
    BlogDetailsComponent,
    PostCommentsComponent,
    CommentsComponent,
    LikeCommentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgMaterialModule,
    CKEditorModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
