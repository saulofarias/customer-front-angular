import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input() label: string;
  @Input() type: string = 'text';
  @Input() controlName: string;
  @Input() message: string;
  @Input() formGroup: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }
}
