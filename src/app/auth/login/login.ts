import { Component, Inject, OnInit } from '@angular/core';
import { Auth as auth, Auth } from '../auth';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../interface/login.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent implements OnInit {
  formRegister!: FormGroup;
  loginError: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: Auth
  ) {}

  ngOnInit(): void {
    this.formRegister = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  submitLogin(): void {
    if (this.formRegister.valid) {
      this.loginError = '';
      // console.log(this.formRegister.value);
      this.auth.login(this.formRegister.value as Login).subscribe({
        error: (resp: any) => {
          console.error(resp);
          this.loginError = resp;
        },
        complete: () => {
          console.info('Login completo');
          this.router.navigateByUrl('/dashboard');
          this.formRegister.reset();
        },
      });
    } else {
      this.formRegister.markAllAsTouched();
      alert('Error al ingresar los datos.');
    }
  }
}
