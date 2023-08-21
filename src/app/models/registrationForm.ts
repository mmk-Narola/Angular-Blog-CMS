import { FormControl } from '@angular/forms';

export interface UserRegistrationForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  username: FormControl<string>;
  mobile: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  avatar: FormControl<string>;
}
