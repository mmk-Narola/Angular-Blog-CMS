import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from 'src/app/service/blog.service';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss'],
})
export class PostCommentsComponent implements OnInit {
  @Input() blogId: string;
  isSubmited: boolean = false;
  commentForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService
  ) {}
  ngOnInit(): void {
    console.log(this.blogId);
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.commentForm.valid) {
      console.log(this.commentForm.value.comment);
      console.log(this.blogId);

      this.blogService
        .postComment(this.blogId, this.commentForm.value.comment)
        .subscribe({
          next: (res: any) => {
            if (res) {
              console.log(res);
              this.resetForm();
            }
          },
          error: () => {},
        });
    }
  }

  resetForm() {
    this.isSubmited = false;
    this.commentForm.reset();
  }
}
