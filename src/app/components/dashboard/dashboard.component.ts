import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogService } from 'src/app/service/blog.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AuthService } from 'src/app/service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  blogList: any[] = [];
  blog: string = 'http://192.168.100.89:4000/blogs/';
  isLoading = false;
  displayColums: string[] = [
    '_id',
    'title',
    'category',
    'image',
    'action',
    'view',
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private blogService: BlogService,
    private sanitizer: DomSanitizer,
    private authServices: AuthService,
    private snackbar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.getBlog();
    }, 500);
  }

  getBlog() {
    const addedBy = this.authServices.decodeToken().id;
    this.blogService.getAllBlog(addedBy).subscribe({
      next: (res?: any) => {
        this.blogList = res.list;
        this.dataSource = new MatTableDataSource(res?.list);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        res.list.map((data: any) => {
          // const desc: string = this.sanitizeDataArray(data.description);
          // const newObj = {
          //   ...data,
          //   description: desc,
          // };
          // this.blogList.push(newObj);
        });
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deletBlogbyId(id: string) {
    this.blogService.deleteBlog(id).subscribe({
      next: (res: any) => {
        alert('Are you sure deleted blog');
        this.snackbar.showSnackBar(res?.message);
        this.getBlog();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  editBlogById(id) {
    this.router.navigate([`dashboard/editblog/${id}`]);
  }

  sanitizeDataArray(data: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(data.description);
  }

  addPost() {
    this.router.navigate(['dashboard/addblog']);
  }
}

// this.blogService.getAllBlog(addedBy).subscribe((res: any) => {
//   res.list.map((data: any) => {
//     this.blogList.push(newObj);
//     this.dataSource = new MatTableDataSource(res.list);
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
//   });
// });
