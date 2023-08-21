import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {
    console.log(environment.production);
  }
  title = 'Angular-Blog';
  panelOpenState = false;
}
