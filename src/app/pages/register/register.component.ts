import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRegistration } from 'src/app/models/registration';
import { UserRegistrationForm } from 'src/app/models/registrationForm';
import { AuthService } from 'src/app/service/auth.service';
import { CustomFormValidatorService } from 'src/app/service/custom-form-validator.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { UserNameValidationService } from 'src/app/service/user-name-validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userRegistrationForm: FormGroup<UserRegistrationForm>;
  showPassword = false;
  showConfirmPassword = false;
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  previews: string[] = [];

  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private readonly snackBarService: SnackbarService,
    private readonly auth: AuthService
  ) {}

  ngOnInit(): void {
    this.userRegistrationForm = this.fb.group({
      firstName: this.fb.control('', [
        Validators.required,
        Validators.pattern('^[A-Za-z]{1,30}$'),
      ]),
      lastName: this.fb.control('', [
        Validators.required,
        Validators.pattern('^[A-Za-z]{1,30}$'),
      ]),
      username: this.fb.control('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_-]{3,8}$'),
      ]),
      mobile: this.fb.control('', [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      email: this.fb.control('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: this.fb.control('', [
        Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$'),
      ]),
      avatar: this.fb.control(''),
    });
  }

  protected get registrationFormControl() {
    return this.userRegistrationForm.controls;
  }

  selectFiles(event: any): void {
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;
    this.previews = [];

    if (this.selectedFiles && this.selectedFiles[0]) {
      const file = event.target.files[0];
      this.userRegistrationForm.patchValue({
        avatar: file,
      });

      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }

  registerUser(): void {
    if (this.userRegistrationForm.valid) {
      const formData = new FormData();
      formData.append(
        'firstName',
        this.userRegistrationForm.get('firstName').value
      );
      formData.append(
        'lastName',
        this.userRegistrationForm.get('lastName').value
      );
      formData.append(
        'username',
        this.userRegistrationForm.get('username').value
      );
      formData.append('mobile', this.userRegistrationForm.get('mobile').value);
      formData.append('email', this.userRegistrationForm.get('email').value);
      formData.append(
        'password',
        this.userRegistrationForm.get('password').value
      );
      formData.append('avatar', this.userRegistrationForm.get('avatar').value);

      this.auth.registerUser(formData).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['login']);
        },
        error: (error) => {
          this.snackBarService.showSnackBar(
            'Username or Email already exits!!',
            1000,
            'right'
          );
          console.error(
            'error occurred while trying to register a new user : ',
            error
          );
        },
      });
    } else {
      this.snackBarService.showSnackBar(
        'Pleaser Fill The Form',
        1000,
        'center'
      );
    }
  }
}
