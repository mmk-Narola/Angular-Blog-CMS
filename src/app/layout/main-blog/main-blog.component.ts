import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/service/blog.service';

@Component({
  selector: 'app-main-blog',
  templateUrl: './main-blog.component.html',
  styleUrls: ['./main-blog.component.scss'],
})
export class MainBlogComponent implements OnInit {
  card: any = new Array(6);
  list: any[] = [];
  dataArray: any;

  constructor(private blogService: BlogService, private route: Router) {}

  ngOnInit(): void {
    this.blogService.gellAllPublicBlog().subscribe((res: any) => {
      console.log(res);
      this.dataArray = res;
    });
  }

  reviceBlodId(id: string) {
    console.log(id);
    this.route.navigate([`/blog/${id}`]);
  }
}
