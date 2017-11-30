import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ProductoEditComponent } from './producto-edit.component';

import { AuthenticationService } from '../../auth/authentication.service';
import { ProductService } from '../../services/product.service';
import { Categorie } from '../../models/Categorie';
import { Response } from '../../models/Response';
import { Product } from '../../models/product';
import { ProductImage } from '../../models/productImage';

describe('ProductoEditComponent', () => {
  let component: ProductoEditComponent;
  let fixture: ComponentFixture<ProductoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoEditComponent ],
      imports: [RouterTestingModule,FormsModule,HttpModule],
      providers: [ AuthenticationService, ProductService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoEditComponent);
    component = fixture.componentInstance;
    component.currentUser = JSON.stringify({ username: 'username', token: 'token', idUser: 'idUser'});
    fixture.detectChanges();
  });

  it('should create ProductoEditComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should load item categories', () => {
    let service = TestBed.get(ProductService);
    let categories: Categorie[] = [];
    categories.push(new Categorie(1,'categorie 1','desc categorie 1'));
    categories.push(new Categorie(2,'categorie 2','desc categorie 2'));
    categories.push(new Categorie(3,'categorie 3','desc categorie 3'));
    let response = new Response('success',200,categories);
    spyOn(service, 'getCategories').and.returnValue(Observable.from([response]));
    component.ngOnInit();
    expect(component.categorias).toBe(categories);
  });

  it('should get product details', () => {
    let service = TestBed.get(ProductService);
    let product: Product = new Product(0,'product name','product description',0,0,'product image url',[]);
    let response = new Response('success',200,product);
    component.idProducto = 0;
    spyOn(service, 'getProductDetail').and.returnValue(Observable.from([response]));
    component.ngOnInit();
    expect(component.producto).toBe(product);
  });

  it('should add a new image, and it must be the main image. product image should be reseted after being added', () => {
    component.productImage = new ProductImage(null,'urlImage','0');
    component.addProductImage();
    expect(component.producto.IMAGES.length).toBeGreaterThan(0);
    expect(component.producto.IMAGES[0].IMAGEN_PRINCIPAL).toEqual('1');
    expect(component.productImage).toEqual(new ProductImage(null,'','0'));
  });

  it('adding a new main image, flag the other main image as main=false', () => {
    component.productImage = new ProductImage(null,'urlImage','0');
    component.addProductImage();
    expect(component.producto.IMAGES.length).toBeGreaterThan(0);
    expect(component.producto.IMAGES[0].IMAGEN_PRINCIPAL).toEqual('1');
    expect(component.productImage).toEqual(new ProductImage(null,'','0'));
    component.productImage = new ProductImage(null,'urlImage2','0');
    component.imagenPrincipal = true;
    component.addProductImage();
    expect(component.producto.IMAGES[0].IMAGEN_PRINCIPAL).toEqual('0');
  });

  it('should delete a image', () => {
    component.productImage = new ProductImage(null,'urlImage','0');
    component.addProductImage();
    component.productImage = new ProductImage(null,'urlImage','0');
    component.addProductImage();
    expect(component.producto.IMAGES.length).toBe(2);
    component.deleteProductImage(0);
    expect(component.producto.IMAGES.length).toBe(1);
  });

  it('should navigate to userProductList', () => {
    this.currentUser = JSON.stringify({ username: 'username', token: 'token', idUser: 'idUser'});
    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigate');

    component.navigateToProductList();

    expect(spy).toHaveBeenCalledWith(['products/' + this.currentUser.username]);
  });
});
