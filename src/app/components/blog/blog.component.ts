import { Component, OnInit } from '@angular/core';
import { SubcriptionService } from 'src/app/service/subcription.service';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as Editor from 'ckeditor-custom-build/build/ckeditor';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BlogService } from 'src/app/service/blog.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  public Editor: any = Editor;
  // public Editor = ClassicEditor;
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  previews: string;
  category: any[] = [
    { value: 'Web', viewValue: 'Web' },
    { value: 'React', viewValue: 'React' },
    { value: 'Angular', viewValue: 'Angular' },
    { value: 'Javascript', viewValue: 'Javascript' },
    { value: 'Business', viewValue: 'Business' },
    { value: 'Finance', viewValue: 'Finance' },
    { value: 'Stock', viewValue: 'Stock' },
    {
      value: 'Tech',
      viewValue: 'Tech',
    },
  ];
  blogPost: FormGroup<any>;
  blogId: string;
  isEdit = false;
  blogImg: string;
  previewImg: boolean = false;

  constructor(
    private ab: SubcriptionService,
    private fb: FormBuilder,
    private blogService: BlogService,
    private snackbar: SnackbarService,
    private route: Router,
    private activetedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.blogForm();
    this.activetedRoute.paramMap.subscribe((param) => {
      this.blogId = param.get('id');
      this.isEdit = this.blogId ? true : false;
    });

    if (this.blogId) {
      this.patchBlogForm();
    }
  }

  blogForm() {
    this.blogPost = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      image: new FormControl(''),
    });
  }

  selectFiles(event: any): void {
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;
    this.previews = '';

    if (this.selectedFiles && this.selectedFiles[0]) {
      const file = event.target.files[0];
      this.blogPost.patchValue({
        image: file,
      });

      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previews = e.target.result;
        };
        reader.readAsDataURL(this.selectedFiles[i]);
        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
    this.previewImg = true;
  }

  patchBlogForm() {
    this.blogService.getBlogById(this.blogId).subscribe((res: any) => {
      this.blogImg = res?.data?.image;
      this.blogPost.patchValue({
        title: res?.data?.title,
        description: res?.data?.description,
        category: res?.data?.category,
      });
    });
  }

  onSubmitBlog() {
    if (this.blogPost.invalid) {
      return;
    }
    this.isEdit ? this.updatePost() : this.createBlog();
  }

  createBlog() {
    console.log(this.blogPost.value);
    if (this.blogPost.valid) {
      const formData = new FormData();
      formData.append('title', this.blogPost.get('title').value);
      formData.append('description', this.blogPost.get('description').value);
      formData.append('category', this.blogPost.get('category').value);
      formData.append('image', this.blogPost.get('image').value);
      this.blogService.createBlog(formData).subscribe((res: any) => {
        console.log(res);
        this.snackbar.showSnackBar(res?.message, 1000, 'right');
        this.route.navigate(['/dashboard']);
      });
    }
  }

  updatePost() {
    console.log('Update Post', this.blogPost.value);
    this.blogService
      .updateBlog(this.blogId, this.blogPost.value)
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  back() {
    this.route.navigate(['/dashboard']);
  }
}
