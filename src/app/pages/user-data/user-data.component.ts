import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  DialogField,
  ModalDialogComponent,
} from '../../shared/components/modal-dialog/modal-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-data',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss',
})
export class UserDataComponent {
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  readonly dialog = inject(MatDialog);

  user = this.userService.user;

  form = this.formBuilder.group({
    nome: [{ value: this.user()?.nome || '', disabled: true }],
    email: [{ value: this.user()?.email || '', disabled: true }],
  });

  cadastrarEndereco() {
    const token = this.authService.getToken();

    if (!token) return;

    const formConfig: DialogField[] = [
      {
        name: 'cep',
        label: 'CEP',
        button: {
          icon: 'search',
          callback: (cep: string) => this.buscarEnderecoPeloCep(cep, dialogRef),
        },
        validators: [Validators.required],
      },
      { name: 'rua', label: 'Rua' },
      { name: 'numero', label: 'Numero', type: 'number' },
      { name: 'complemento', label: 'Complemento' },
      { name: 'cidade', label: 'Cidade' },
      { name: 'estado', label: 'Estado' },
    ];

    const dialogRef = this.dialog.open(ModalDialogComponent, {
      data: { title: 'Adicionar Endereço', formConfig },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.saveEndereco(result, token).subscribe({
          next: (response) => {},
          error: (error) => {},
        });
      }
    });
  }

  editarEndereco(endereco: {
    id: number;
    rua: string;
    numero: number;
    complemento: string;
    cidade: string;
    estado: string;
    cep: string;
  }) {
    const token = this.authService.getToken();
    if (!token) return;

    const formConfig: DialogField[] = [
      {
        name: 'cep',
        label: 'CEP',
        value: endereco.cep,
        button: {
          icon: 'search',
          callback: (cep: string) => this.buscarEnderecoPeloCep(cep, dialogRef),
        },
        validators: [Validators.required],
      },
      { name: 'rua', label: 'Rua', value: endereco.rua },
      {
        name: 'numero',
        label: 'Numero',
        type: 'number',
        value: endereco.numero,
      },
      {
        name: 'complemento',
        label: 'Complemento',
        value: endereco.complemento,
      },
      { name: 'cidade', label: 'Cidade', value: endereco.cidade },
      { name: 'estado', label: 'Estado', value: endereco.estado },
    ];

    const dialogRef = this.dialog.open(ModalDialogComponent, {
      data: { title: 'Editar Endereço', formConfig },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.updateEndereco(endereco.id, result, token).subscribe({
          next: () => console.log('Telefone cadastrado com sucesso', result),
          error: () => console.log('Erro ao cadastrar telefone', result),
        });
      }
    });
  }

  buscarEnderecoPeloCep(
    cep: string,
    dialogRef: MatDialogRef<ModalDialogComponent, any>,
  ) {
    this.userService.getEnderecoByCep(cep).subscribe({
      next: (response) => {
        dialogRef.componentInstance.form.patchValue({
          rua: response.logradouro,
          complemento: response.complemento,
          cidade: response.localidade,
          estado: response.uf,
        });
      },
      error: () => console.warn('Cep nao encontrado'),
    });
  }

  cadastrarTelefone() {
    const token = this.authService.getToken();
    if (!token) return;

    const formConfig: DialogField[] = [
      { name: 'ddd', label: 'DDD', validators: [Validators.required] },
      { name: 'numero', label: 'Numero', validators: [Validators.required] },
    ];

    const dialogRef = this.dialog.open(ModalDialogComponent, {
      data: { title: 'Adicionar Telefone', formConfig },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.saveTelefone(result, token).subscribe({
          next: () => console.log('Telefone cadastrado com sucesso', result),
          error: () => console.log('Erro ao cadastrar telefone', result),
        });
      }
    });
  }

  editarTelefone(telefone: { id: number; ddd: string; numero: string }) {
    const token = this.authService.getToken();
    if (!token) return;

    const formConfig: DialogField[] = [
      {
        name: 'ddd',
        label: 'DDD',
        value: telefone.ddd,
        validators: [Validators.required],
      },
      {
        name: 'numero',
        label: 'Numero',
        value: telefone.numero,
        validators: [Validators.required],
      },
    ];

    const dialogRef = this.dialog.open(ModalDialogComponent, {
      data: { title: 'Editar Telefone', formConfig },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.updateTelefone(telefone.id, result, token).subscribe({
          next: () => console.log('Telefone editado com sucesso', result),
          error: () => console.log('Erro ao editar telefone', result),
        });
      }
    });
  }
}
