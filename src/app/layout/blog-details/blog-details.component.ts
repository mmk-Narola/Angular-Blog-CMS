import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/service/blog.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
})
export class BlogDetailsComponent implements OnInit {
  blogId: string;
  blogData: any;
  blogListdata: boolean = false;
  isLoading = false;
  constructor(
    private activetedRoute: ActivatedRoute,
    private blogService: BlogService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.activetedRoute.paramMap.subscribe((param) => {
      this.blogId = param.get('id');
    });

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.blogService.gellAllPublicBlog(this.blogId).subscribe((res: any) => {
        if (res?.list) {
          this.blogData = res?.list[0];
          this.blogListdata = true;
        }
      });
    }, 500);
  }

  likePost(id: string) {
    console.log(id);
    this.blogService.likePost(id).subscribe({
      next: (res: any) => {
        alert('Did you Like the post,Please Login Here');
        console.log(res);
      },
      error: (error: any) => {
        confirm('Did you Like the post,Please Login Here');
        this.snackbar.showSnackBar('Did you Like the post,Please Login');
      },
    });
  }
}
