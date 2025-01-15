import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Credenciales } from '../../interfaces/credenciales';
import { inject } from '@angular/core';


@Component({
  selector: 'app-formulario-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './formulario-login.component.html',
  styleUrl: './formulario-login.component.css'
})
export class FormularioLoginComponent {

  // 1. injección de dependencias
  _loginService = inject(LoginService);
  _toastrService = inject(ToastrService);

  // Conectar nuestro formulario 
  formularioLogin = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  manejoDeInicioSesion() {
    const emailLogin = this.formularioLogin.value.email;
    const passwordLogin = this.formularioLogin.value.password;
    console.log(this.formularioLogin.value.email);
    console.log(this.formularioLogin.value.password);

    let credencialesIngreso: Credenciales | null = null;

    if (typeof emailLogin === "string" && typeof passwordLogin === "string"){
      credencialesIngreso = {
        emailLogin,
        passwordLogin
      }

    }
    if (credencialesIngreso) {
      this._loginService.inicioSesion(credencialesIngreso).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res) {
            console.log(res);
            localStorage.setItem("token", res.tokenGenerado)
            this._loginService.redireccionar();
          }
        },

        error: (err) => {
          console.log(err.error.mensaje);
          this._toastrService.error(err.error.mensaje || "Ocurrió un error al iniciar sesión");
          this.formularioLogin.reset();
        }
      });
    }

  }
}
