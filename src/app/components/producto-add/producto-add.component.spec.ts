import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ProductoAddComponent } from './producto-add.component';

class RouterStub {
  navigate(params){
  }
}

class ActivatedRouteStub {
  params: Observable<any> = Observable.empty();
}

describe('ProductoAddComponent', () => {
  let component: ProductoAddComponent;
  let fixture: ComponentFixture<ProductoAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,FormsModule,HttpModule],
      declarations: [ ProductoAddComponent ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TEST DE CREACION DEL COMPONENTE
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TEST DE NAVEGACION A OTRA PAGINA
  it('should redirect user to product-list page', () => {
    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigate');

    component.navigateToProductList();

    expect(spy).toHaveBeenCalledWith(['product-list']);
  });

});
