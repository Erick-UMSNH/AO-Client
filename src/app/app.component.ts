import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AO';
  @Input() passingToggle: boolean;

  constructor() {
    this.passingToggle = false;
  }

  handleToggle = (toggle: boolean) => {
    console.log('llegue aqui con el valor de : ', toggle);
  };
}
