import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { SubcriptionService } from 'src/app/service/subcription.service';

@Component({
  selector: 'app-blog-header',
  templateUrl: './blog-header.component.html',
  styleUrls: ['./blog-header.component.scss'],
})
export class BlogHeaderComponent implements OnInit {
  loginInfo: any;
  isLoginUser: boolean = false;
  isNotLogin: boolean = true;
  constructor(
    private authService: AuthService,
    private subcription: SubcriptionService,
    private route: Router,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.subcription.userData$.asObservable().subscribe((res: any) => {
      // console.log(res);
      if (res) {
        this.loginInfo = res;
        this.isLoginUser = true;
        this.isNotLogin = false;
      }
    });
  }

  logout() {
    this.authService.logout();
    this.snackbar.showSnackBar('Logout Successfully');
    this.route.navigate(['/']);
    this.isLoginUser = false;
    this.isNotLogin = true;
  }
}
