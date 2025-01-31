import { TestBed } from '@angular/core/testing';
import { Credenciales } from '../interfaces/credenciales';
import { LoginService } from './login.service';
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



describe("Pruebas para LoginService", () => {
  let _loginservice: LoginService;
  let _httpMock: HttpTestingController;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockToastr: jasmine.SpyObj<ToastrService>;
  const urlTest = "http://localhost:3000/iniciarSesion";
  const emailLogin = "christian@gmail.com";
  const passwordLogin = "123";
  const tokenTest = "fmxfghdfgh";





  // beforeEach y afterAll -> configuracion global

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj("Router", ["navigate"]);
    mockToastr = jasmine.createSpyObj("ToastrService", ["info"]);
    TestBed.configureTestingModule({
      providers: [
        LoginService,
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide: Router,useValue:mockRouter},
        {provide: ToastrService,useValue:mockToastr}
      ]
    });

    //injeccion de servicios
    _loginservice = TestBed.inject(LoginService);
    _httpMock = TestBed.inject(HttpTestingController);
  });

//------------------------------------------------------
  it("Deberia hacer una petici0n POST para iniciar sesion", () => {

    const mockRespuesta = {


      mensaje: "inicio de sesion exitoso",
      token: tokenTest
    }

    const mockCredenciales: Credenciales = {
      emailLogin,
      passwordLogin
    }

    _loginservice.inicioSesion(mockCredenciales).subscribe(
      (res) => {
        expect(res).toEqual(mockRespuesta);
      }
    );

    const peticion = _httpMock.expectOne(urlTest);
    expect(peticion.request.method).toBe("POST")

    peticion.flush(mockRespuesta);
  });


//------------------------------------------------------

  it("Deberia obtener el token almacenado en el localStorage", () => {
    localStorage.setItem("token", tokenTest)
    expect(_loginservice.obtenerToken()).toBe(tokenTest)
  });
//------------------------------------------------------
  describe('isAdmin', () => {
    it('debería devolver true si el token contiene isAdmin como true', () => {
      const tokenAdmin = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjVkOGMyYzhmY2U0ZTBiOWUwYTA0MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTczNzQyNTgwOSwiZXhwIjoxNzM3NDI5NDA5fQ.tERWcwK4m91kFVVP0SMssBKXqafXocbQAmWagZoqe_0";
      localStorage.setItem("token", tokenAdmin);
      const result = _loginservice.isAdmin();

      expect(result).toBeTrue();
    });

    it('debería devolver false si el token contiene isAdmin como false', () => {
      const tokenUser = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OGYwNDFjYmY2YWQ3Njg3N2RkN2Q2MCIsImlhdCI6MTczNzQyNTk2MywiZXhwIjoxNzM3NDI5NTYzfQ.dNWAj5kHOIi-QB-KEZCMvR32cx1tOIfIok35lJoy9tU";
      localStorage.setItem("token", tokenUser);
      const result = _loginservice.isAdmin();

      expect(result).toBeFalse();
    });

    it('debería devolver false y mostrar un error si no hay token', () => {
      spyOn(_loginservice, 'obtenerToken').and.returnValue(null);
      spyOn(console, 'error');

      const result = _loginservice.isAdmin();

      expect(result).toBeFalse();
      expect(console.error).toHaveBeenCalledWith('No se encontro token');
    });
  });

//------------------------------------------------------

  it('debería redirigir a la raíz ("/") si el usuario no es admin', () => {
    spyOn(_loginservice, 'isAdmin').and.returnValue(false);

    _loginservice.redireccionar();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('debería redirigir a "/admin" si el usuario es admin', () => {
    spyOn(_loginservice, 'isAdmin').and.returnValue(true);

    _loginservice.redireccionar();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin']);
  });

//------------------------------------------------------
  it("Deberia veificar si el usuario esta logeado", () => {
    localStorage.setItem("token", tokenTest);
    expect(_loginservice.estaLogeado()).toBeTrue();
  });

  //------------------------------------------------------
  it("Deberia cerrar sesion", () => {
    localStorage.setItem("token", tokenTest);
    _loginservice.cierreSesion();
    expect(localStorage.getItem("token")).toBeNull();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});
