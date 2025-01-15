//inyeccion der dependencias
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from "jwt-decode";
import { Credenciales } from '../interfaces/credenciales';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //1. inyectar dependencias que tienen proovedores---------------------------------------
  private _httpClient = inject(HttpClient);
  private _router = inject(Router);
  public _toastrService = inject(ToastrService);

  //2. ruta de conexion con el backend------------------------------
  private URL_LOGIN = "http://localhost:3000/iniciarSesion";

  //3.INICIAR SESION(PETICION POST)------------------------------
  inicioSesion(credencialesIngreso: Credenciales) {

    return this._httpClient.post(this.URL_LOGIN, credencialesIngreso);
  }

  //4.OBTENER EL TOKEN------------------------------
  obtenerToken() {
    return localStorage.getItem("token");
  }

  //5.VALIDAR SI ES O NO ADMINISTRADOR------------------------------
  isAdmin() {
    const token = this.obtenerToken();
    if (token) {
      const decodificado: any = jwtDecode(token);
      return decodificado.isAdmin ? true : false;
    } else {
      console.error("No se encontro token");
      return false;
    }
  }
  redireccionar() {
    if (!this.isAdmin()) {
      this._router.navigate(["/"]);
    } else {
      this._router.navigate(["/admin"]);
    }
  }
  //6. SE INICIO SACTIFACTORIAMENTE O NO SESION------------------------------
  estaLogeado() {
    return this.obtenerToken() ? true : false;
  }

  //7.CIERRE DE SESION ------------------------------
  cierreSesion() {
    return this._toastrService.info("Cierre de sesion exitoso");

    localStorage.removeItem("token");

    this._router.navigate(["/"]);
  }

}
