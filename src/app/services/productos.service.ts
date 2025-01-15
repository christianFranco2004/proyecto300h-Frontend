import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Productos } from '../interfaces/productos';

@Injectable({
  providedIn: 'root'
})



export class ProductosService {
  //1.inyeccion de dependencias-----------------------
  private _httpClient = inject(HttpClient);

  //2. ruta de conexion con el backend------------------------------
  private URL_PRODUCTOS = "http://localhost:3000/productos";

  //3. hacer las peticiones-------------------------

  //peticion post
  postProducto(product: Productos) {
    return this._httpClient.post(this.URL_PRODUCTOS + "/crear", product);
  }
  //peticion get
  getProducto() {
    return this._httpClient.get(this.URL_PRODUCTOS + "/obtener");
  }
  //peticion put
  putProducto(productActualizado: Productos, id: string) {
    return this._httpClient.put(this.URL_PRODUCTOS + "/actualizar/" + id, productActualizado);
  }
  //peticion delete
  deleteProduct(id: string) {
    return this._httpClient.delete(this.URL_PRODUCTOS + "/eliminar/" + id);
  }

  //peticion get categoria
  getCategoriaUsuario(categoria: string){
return this._httpClient.get(this.URL_PRODUCTOS + "/obtener/" + categoria);
  }

}


