import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css'],
})
export class NewClientComponent implements OnInit {
  clientForm: FormGroup;

  constructor() {
    this.clientForm = new FormGroup({
      cName: new FormControl('', [Validators.required]),
      cLastName: new FormControl(''),
      cAreaCode: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[0-9]*$/),
      ]),
      cPhone: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
        Validators.pattern(/^[0-9]*$/),
      ]),
      cEmail: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  submitNewClient = () => {
    console.log('Submitting new client');
    console.log(this.clientForm.value);
  };
}
