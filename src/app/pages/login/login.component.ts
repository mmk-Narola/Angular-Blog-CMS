import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject, switchMap, takeUntil } from 'rxjs';
import { UserLogin } from 'src/app/models/login';
import { LoginForm } from 'src/app/models/loginForm';
import { AuthService } from 'src/app/service/auth.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup<LoginForm> | undefined;
  private destroyed$ = new ReplaySubject<void>(1);
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly snackBarService: SnackbarService,
    private readonly auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.fb.control('', Validators.required),
      password: this.fb.control('', [
        Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$'),
      ]),
    });
  }

  protected get loginFormControl() {
    return this.loginForm.controls;
  }

  login() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          this.router.navigate(['/dashboard']);
          localStorage.setItem('token', res?.token);
          this.snackBarService.showSnackBar(res?.message, 1000, 'right');
        },
        error: (error) => {
          this.snackBarService.showSnackBar(
            error?.error?.message,
            1000,
            'center'
          );
          console.error('error occurred while trying new user : ', error);
        },
      });
    } else {
      this.snackBarService.showSnackBar(
        'Can,t login, Please Fill Form',
        1000,
        'center'
      );
    }
  }
}
