import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SubcriptionService } from './subcription.service';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  baseURL = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private subcription: SubcriptionService
  ) {}

  createBlog(content: any) {
    return this.http.post(this.baseURL + '/blog', content);
  }

  getAllBlog(userId?: undefined) {
    const Obj = {
      options: {
        limit: 15,
        pagination: true,
      },
      query: {
        addedBy: userId,
      },
    };

    return this.http.post(this.baseURL + '/blog/getAll', Obj);
  }

  getBlogById(blogId?: string) {
    return this.http.post(this.baseURL + `/blog/${blogId}`, null);
  }

  deleteBlog(blogId?: string) {
    return this.http.delete(this.baseURL + `/blog/${blogId}`);
  }

  updateBlog(blogId?: string, updateBlog?: any) {
    return this.http.put(this.baseURL + `/blog/${blogId}`, updateBlog);
  }

  gellAllPublicBlog(blogId?: string) {
    const Obj = {
      options: {
        limit: 15,
        pagination: true,
      },
      query: {
        _id: blogId,
      },
    };
    return this.http.post(this.baseURL + '/blog/open/public', Obj);
  }

  likePost(blogId?: string) {
    const Obj = {
      blog: blogId,
    };

    return this.http.post(this.baseURL + '/like', Obj);
  }

  postComment(id: string, comment: string) {
    const Obj = {
      blog: id,
      comment: comment,
    };

    return this.http.post(this.baseURL + '/comment', Obj);
  }

  commentbyId(id: string) {
    const Obj = {
      options: {
        pagination: false,
      },
      query: {
        blog: id,
      },
    };
    return this.http.post(this.baseURL + `/comment/getAll`, Obj);
  }
}
