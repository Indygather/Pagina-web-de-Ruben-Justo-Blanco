import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { ProductoDetailComponent } from './producto-detail.component';
import { MenuComponent } from '../menu/menu.component';

import { AuthenticationService } from '../../auth/authentication.service';
import { ProductService } from '../../services/product.service';
import { Categorie } from '../../models/Categorie';
import { Response } from '../../models/Response';
import { Product } from '../../models/product';

class RouterStub {
  navigate(params){
  }
}

class ActivatedRouteStub {
  private subject = new Subject();

  push(value) {
    this.subject.next(value);
  }

  get params() {
    return this.subject.asObservable();
  }

}

describe('ProductoDetailComponent', () => {
  let component: ProductoDetailComponent;
  let fixture: ComponentFixture<ProductoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpModule,FormsModule],
      declarations: [ ProductoDetailComponent, MenuComponent ],
      providers: [ AuthenticationService, ProductService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ProductoDetailComponent', () => {
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

});
