import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-title',
  templateUrl: './menu-title.component.html',
  styleUrls: ['./menu-title.component.css', '../../css/menus.css'],
})
export class MenuTitleComponent implements OnInit {
  @Input() title: string = '';
  @Input() subtitle: string = '';

  constructor() {}

  ngOnInit(): void {}
}
