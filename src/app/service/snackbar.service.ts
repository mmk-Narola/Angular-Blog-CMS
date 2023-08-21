import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private readonly snackBar: MatSnackBar) {}

  showSnackBar(message?: string, duration?: number, horizontalPosition?: any) {
    this.snackBar.open(message, 'Close', {
      duration: duration,
      verticalPosition: 'top',
      horizontalPosition: horizontalPosition,
    });
  }
}
