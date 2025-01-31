import { TestBed } from '@angular/core/testing';
import { Productos } from '../interfaces/productos';
import { ProductosService } from './productos.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";



describe('produtosService', () => {
  let _productosService: ProductosService;
  let _mockHttp: HttpTestingController;
  const urlGet = "http://localhost:3000/productos/obtener";
  const urlPost = "http://localhost:3000/productos/crear";
  const urlPut = "http://localhost:3000/productos/actualizar/123";
  const urlDelete = "http://localhost:3000/productos/eliminar/123";
  const urlGetCategoryAdultos = "http://localhost:3000/productos/obtener/adultos";
  const urlGetCategoryNiños = "http://localhost:3000/productos/obtener/niños";


  const tokenTest = "fmxfghdfgh";
  const Image = "zapato";
  const name = "christian";
  const category = "adultos";
  const price = "200";
  const description = "zapatos online";
  const tallas = "40";

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductosService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    _productosService = TestBed.inject(ProductosService);
    _mockHttp = TestBed.inject(HttpTestingController);
  });




  //------------------------------------------------------
  it("Deberia hacer una peticion GET para mostrar los productos", () => {

    const mockProduct = [
      { Image: "zapato", name: "christian", category: ["niños", "adultos"], price: "200", description: "zapatos online", tallas: "40" },

    ];

    const mockResponse = {
      mensaje: 'Se encontraron productos almacenados',
      numeroProductos: mockProduct.length,
      datos: mockProduct
    }

    _productosService.getProducto().subscribe(
      (res) => {
        expect(res).toEqual(mockResponse);
      }
    );
    const req = _mockHttp.expectOne(urlGet);
    expect(req.request.method).toBe("GET");

    req.flush(mockResponse);
  }); 
  //------------------------------------------------------

   it("Deberia hacer una petici0n POST para crear un producto", () => {
  
      const mockRespuesta = {
  
  
        mensaje: "inicio de sesion exitoso",
        token: tokenTest
      }
  
      const mockProduct: Productos = {
        Image,
        name,
        category,
        price: 200,
        description,
        tallas
      }
  
      _productosService.postProducto(mockProduct).subscribe(
        (res)=>{
          expect(res).toEqual(mockRespuesta);
        }
      );
  
      const peticion = _mockHttp.expectOne(urlPost);
      expect(peticion.request.method).toBe("POST")
      peticion.flush(mockRespuesta);
    });
 //------------------------------------------------------

 describe('putUsuarios', () => {
  it('debería actualizar un producto', () => {
    const mockId = '123';
    const mockRespuesta = {

      mensaje: "producto actualizado satisfactoriamente",
    }
    const mockProductActualizado: Productos = {
      Image,
      name,
      category,
      price: 200,
      description,
      tallas
    }
    
      _productosService.putProducto(mockProductActualizado, mockId).subscribe((response) => {
      expect(response).toEqual(mockRespuesta);
    });

    const peticion = _mockHttp.expectOne(urlPut);
    expect(peticion.request.method).toBe("PUT")
    peticion.flush(mockRespuesta);
  });
});
//------------------------------------------------------

describe('deleteProducto', () => {
  it('debería eliminar un producto', () => {
    const mockId = '123';
    const mockRespuesta = {


      mensaje: "producto eliminado satisfactoriamente",
    }
      _productosService.deleteProduct(mockId).subscribe((response) => {
      expect(response).toEqual(mockRespuesta);
    });

    const peticion = _mockHttp.expectOne(urlDelete);
    expect(peticion.request.method).toBe("DELETE")
    peticion.flush(mockRespuesta);
  });
}); 
//------------------------------------------------------

it("Deberia hacer una peticion GET para mostrar los productos por categoria adultos", () => {
const category = "adultos";

const mockProduct = [
    { Image: "zapato", name: "christian",category: ["adultos", "niños"], price: "200", description: "zapatos online", tallas: "40" },

  ];

  const mockResponse = {
    mensaje: 'Se encontraron productos almacenados',
    numeroProductos: mockProduct.length,
    datos: mockProduct
  }


  _productosService.getCategoryProduct(category).subscribe(
    (res) => {
      expect(res).toEqual(mockResponse);
    }
  );
  const req = _mockHttp.expectOne(urlGetCategoryAdultos);
  expect(req.request.method).toBe("GET");

  req.flush(mockResponse);
}); 
//------------------------------------------------------
it("Deberia hacer una peticion GET para mostrar los productos por categoria niños", () => {
  const category = "niños";
  
  const mockProduct = [
      { Image: "zapato", name: "christian",category: ["adultos", "niños"], price: "200", description: "zapatos online", tallas: "40" },
  
    ];
  
    const mockResponse = {
      mensaje: 'Se encontraron productos almacenados',
      numeroProductos: mockProduct.length,
      datos: mockProduct
    }
  
  
    _productosService.getCategoryProduct(category).subscribe(
      (res) => {
        expect(res).toEqual(mockResponse);
      }
    );
    const req = _mockHttp.expectOne(urlGetCategoryNiños);
    expect(req.request.method).toBe("GET");
  
    req.flush(mockResponse);
  }); 







});
