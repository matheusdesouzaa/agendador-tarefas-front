import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PasswordFieldComponent } from '../../shared/components/password-field/password-field.component';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    PasswordFieldComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
    });
  }

  get passwordControl(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get fullNameError(): string | null {
    const fullNameControl = this.form.get('fullName');
    if (fullNameControl?.hasError('required'))
      return 'O nome completo é obrigatório';
    if (fullNameControl?.hasError('minlength'))
      return 'Cadastre um nome com mais de 3 letras';
    return null;
  }

  get emailError(): string | null {
    const emailControl = this.form.get('email');
    if (emailControl?.hasError('required'))
      return 'O cadastro de um email é obrigatório';
    if (emailControl?.hasError('email')) return 'Este email é inválido';
    return null;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log('formulário submetido', this.form.value);
  }
}
