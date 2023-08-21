import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import {
  Observable,
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserNameValidationService {
  constructor() {}

  // validate(control: AbstractControl): Observable<ValidationErrors | null> {
  //   return c;
  // }
}
