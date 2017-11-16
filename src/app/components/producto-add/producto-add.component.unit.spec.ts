import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

import { ProductoAddComponent } from './producto-add.component';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';

describe('ProductoAddComponent Test', () => {
    let productoAddComponent: ProductoAddComponent;
    let productoService: ProductoService;
    let productos = [
        {id:1, nombre: 'nombre1',description:'Descripcion1', precio: 20, imagen:'src/imagen1'},
        {id:2, nombre: 'nombre2',description:'Descripcion2', precio: 30, imagen:'src/imagen2'},
        {id:3, nombre: 'nombre3',description:'Descripcion3', precio: 40, imagen:'src/imagen3'}
    ];
    
    beforeEach(() =>{
        productoService = new ProductoService(null);
        productoAddComponent = new ProductoAddComponent(null,null,productoService);
    });

    it('La variable debe ser Hola mundo tras crear el componente', () => {
        expect(productoAddComponent.miVariable).toBe('Hola mundo!');
    });
    it('La variable debe ser Hola de nuevo tras invocar el metodo', () => {
        productoAddComponent.cambiarTextoVariable('Hola de nuevo');
        expect(productoAddComponent.miVariable).toBe('Hola de nuevo');
    });
    it('EVENT EMITTER - La variable debe ser Hola de nuevo tras invocar el metodo', () => {
        let nuevoTexto = null;
        productoAddComponent.variableCambiada.subscribe(t => nuevoTexto = t);

        productoAddComponent.cambiarTextoVariable('Hola de nuevo');

        expect(nuevoTexto).toBe('Hola de nuevo');
    });

    it('Prueba de servicio con SPY, debe devolver los productos del servicio', () => {
        
        spyOn(productoService, 'getProductos').and.callFake(() => {
            return Observable.from([
                {status: 'success',
                code: 200,
                data: productos}
            ]);
        });

        productoAddComponent.ngOnInit();

        expect(productoAddComponent.productos.length).toBe(3);
        expect(productoAddComponent.productos[0].description).toBe('Descripcion1');
    });

    it('Prueba del servicio add productos, el servicio se invoca correctamente', () => {
        let spy = spyOn(productoService, 'addProducto').and.callFake(t => {
        return Observable.empty();
        });
        productoAddComponent.producto = new Producto(0,'producto1','descripcion1',55,'rutaImagen');
        productoAddComponent.onSubmit();

        expect(spy).toHaveBeenCalled();
    });

    xit('Prueba del servicio add productos, el servicio añade un nuevo producto correctamente', () => {
        let producto = {id:9, nombre: 'nombre9',description:'Descripcion9', precio: 90, imagen:'src/imagen9'};
        let productoResponse = {
            status: 'success',
            code: 200,
            data: producto
        };
        let spy = spyOn(productoService, 'addProducto').and.callFake(t => {
        return Observable.from([productoResponse]);
        });

        productoAddComponent.producto = producto;

        productoAddComponent.onSubmit();

        expect(productoAddComponent.productos.indexOf(productoAddComponent.producto)).toBeGreaterThan(-1);
    });

    it('Prueba del servicio add productos, el servicio devuelve un error', () => {
        let error = 'Error desde el servicio';
        let spy = spyOn(productoService, 'addProducto').and.callFake(t => {
        return Observable.throw(error);
        });

        productoAddComponent.onSubmit();
        
        expect(productoAddComponent.errorMessage).toBe('Error desde el servicio');
    });
});