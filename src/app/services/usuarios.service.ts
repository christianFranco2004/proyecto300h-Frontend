import { Injectable, Injector, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuarios } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root'
})


export class UsuariosService {
  //1.inyeccion de dependencias-----------------------
  private _httpClient = inject(HttpClient);

  //2. ruta de conexion con el backend------------------------------
  private  URL_USUARIOS = "http://localhost:3000/usuarios";

  //3. hacer las peticiones---------------------

  //PETICION POST
  postUsuarios(user: Usuarios) {
    return this._httpClient.post(this.URL_USUARIOS + "/crear", user);

  }

  //PETICION GET
  getUsuarios() {
    return this._httpClient.get(this.URL_USUARIOS + "/obtener");
  }

  //PETICION DELETE
  deleteUsuarios(id: string){
return this._httpClient.delete(this.URL_USUARIOS + "/borrar/" + id);
  }
}
