import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SnackbarService } from '../service/snackbar.service';

export const GuardGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const toast = inject(SnackbarService);
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  } else {
    toast.showSnackBar(
      "Can't Access the route,Please Login or Register New User"
    );
    _router.navigate(['login']);
    return false;
  }
};
