import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
    });
  }

  ngOnInit(): void {}

  register() {
    this.authService.register(this.signupForm.value).subscribe({
      next: (res) => {
        if (res) {
          this.signupForm.reset();
          this.router.navigate(['']);
        }
      },
      error: (err) => {
        this.signupForm.reset();
        alert(err.error.message);
      },
    });
  }
}
