import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css', '../../css/menus.css'],
})
export class StartComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
