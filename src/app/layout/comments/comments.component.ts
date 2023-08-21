import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/service/blog.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Input() commentList: any = [];
  blogId: any;
  constructor(
    private activetedRoute: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.activetedRoute.paramMap.subscribe((param) => {
      this.blogId = param.get('id');

      this.blogService.commentbyId(this.blogId).subscribe((res: any) => {
        console.log(res);
      });
    });
  }
}
