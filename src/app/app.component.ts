import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AO';
  toggleState: boolean;

  constructor() {
    this.toggleState = false;
  }
  ngOnInit() {
    this.toggleState = true;
  }

  handleToggle = (toggle: boolean) => {
    console.log('llegue aqui con el valor de : ', toggle);
    this.toggleState = toggle;
  };
}
