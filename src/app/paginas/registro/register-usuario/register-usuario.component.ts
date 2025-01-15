import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormsModule, FormControl } from '@angular/forms';
import { Usuarios } from '../../../interfaces/usuarios';
import { UsuariosService } from '../../../services/usuarios.service';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-usuario',
  imports: [ FormsModule,ReactiveFormsModule],
  templateUrl: './register-usuario.component.html',
  styleUrl: './register-usuario.component.css'
})
export class RegisterUsuarioComponent {
  // 1. injeccion de variables
  _usuariosService = inject(UsuariosService);
  _toastrService = inject(ToastrService);
_router= inject(Router);

  formularioRegistar = new FormGroup({
    Fullname: new FormControl(''),
    Email: new FormControl(''),
    Preference: new FormControl(''),
    Password: new FormControl(''),
    Role: new FormControl('')
  });

  manejoDeRegistro() {
    const fullname = this.formularioRegistar.value.Fullname;
    const email = this.formularioRegistar.value.Email;
    const preference = this.formularioRegistar.value.Preference;
    const password = this.formularioRegistar.value.Password;
    const role = this.formularioRegistar.value.Role;
    console.log(this.formularioRegistar.value.Fullname);
    console.log(this.formularioRegistar.value.Email);
    console.log(this.formularioRegistar.value.Preference);
    console.log(this.formularioRegistar.value.Password);
    console.log(this.formularioRegistar.value.Role);


    let usuariosRegistrar: Usuarios | null = null;

    if (typeof fullname === "string" && typeof email === "string" && typeof preference === "string" && typeof password === "string" && typeof role === "string") {

      usuariosRegistrar = {
        fullname,
        email,
        preference,
        password,
        role
      }
    }


    if (usuariosRegistrar) {
      this._usuariosService.postUsuarios(usuariosRegistrar).subscribe({
        next: (res: any) => {
          if (res) {
            console.log(res);
           this._toastrService.success("usuario creado sactifactoriamente");
           this._router.navigate(["/usuarios"]);
          } else {
            console.error('Hubo un error');
          }
        },

        error: (err) => {
          console.error('Hubo un error',err);
        }

      });
    }
  }
}
