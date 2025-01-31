import { TestBed } from '@angular/core/testing';
import { Usuarios } from '../interfaces/usuarios';
import { UsuariosService } from './usuarios.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";


describe('UsuariosService', () => {
  let _usuariosService: UsuariosService;
  let _httpMock: HttpTestingController;
  const urlPost = "http://localhost:3000/usuarios/crear";
  const urlGet = "http://localhost:3000/usuarios/obtener";
  const urlDelete = "http://localhost:3000/usuarios/borrar/123";

  const tokenTest = "fmxfghdfgh";
  const fullname = "christian";
  const email = "christian@gmai.com";
  const preference = "adultos";
  const password = "123";
  const role = "usuario";

  beforeEach(() => {
    
      TestBed.configureTestingModule({
        providers: [
          UsuariosService,
          provideHttpClient(),
          provideHttpClientTesting(),
        
        ]
      });
  
      //injeccion de servicios
      _usuariosService = TestBed.inject(UsuariosService);
      _httpMock = TestBed.inject(HttpTestingController);
    });

  afterAll(() => {
    _httpMock.verify();
  });


  //------------------------------------------------------
   it("Deberia hacer una peticion GET para mostrar los usuarios", () => {

    const mockUsers = [
      { fullname: "pepito perez", email: "pepito@gmail.com", preference: "adultos", password: "123", role: "usuario" },

    ];

    const mockResponse = {
      mensaje: 'Se encontraron usuarios almacenados',
      numeroUsuarios: mockUsers.length,
      datos: mockUsers
    }

    _usuariosService.getUsuarios().subscribe(
      (res) => {
        expect(res).toEqual(mockResponse);
      }
    );
    const req = _httpMock.expectOne(urlGet);
    expect(req.request.method).toBe("GET");

    req.flush(mockResponse);
  }); 
  //------------------------------------------------------
  it("Deberia hacer una petici0n POST para crear un usuario", () => {

    const mockRespuesta = {


      mensaje: "inicio de sesion exitoso",
      token: tokenTest
    }

    const mockUsuarios: Usuarios = {
      fullname,
      email,
      preference,
      password,
      role,
    }

    _usuariosService.postUsuarios(mockUsuarios).subscribe(
      (res)=>{
        expect(res).toEqual(mockRespuesta);
      }
    );

    const peticion = _httpMock.expectOne(urlPost);
    expect(peticion.request.method).toBe("POST")
    peticion.flush(mockRespuesta);
  });


   //------------------------------------------------------
  describe('deleteUsuarios', () => {
    it('debería eliminar un usuario', () => {
      const mockId = '123';
      const mockRespuesta = {


        mensaje: "usuario eliminado satisfactoriamente",
      }
        _usuariosService.deleteUsuarios(mockId).subscribe((response) => {
        expect(response).toEqual(mockRespuesta);
      });

      const peticion = _httpMock.expectOne(urlDelete);
      expect(peticion.request.method).toBe("DELETE")
      peticion.flush(mockRespuesta);
    });
  }); 

});
