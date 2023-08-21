import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { SubcriptionService } from 'src/app/service/subcription.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  img: string = 'http://192.168.100.89:4000/avatar/';
  avatar: string = this.img + '1690281623575-Female_1.png';
  userData$ = this.subcription.userData$.asObservable();
  badgevisible = false;
  isAdmin = false;

  constructor(
    private subcription: SubcriptionService,
    private authService: AuthService,
    private route: Router,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.getInfo();
  }

  badgevisibility() {
    this.badgevisible = true;
  }

  getInfo() {
    this.authService.userDetails().subscribe((res: any) => {
      this.avatar = this.img + res?.data?.avatar;
      console.log(res?.data);
      this.subcription.userData$.next(res?.data);
      this.isAdmin = res?.data?.userRole === 0 ? true : false;
    });
  }

  logout() {
    this.authService.logout();
    this.snackbar.showSnackBar('Logout Successfully');
    this.route.navigate(['login']);
  }
}
