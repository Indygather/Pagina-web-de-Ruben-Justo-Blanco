import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ProductoAddComponent } from './producto-add.component';

import { AuthenticationService } from '../../auth/authentication.service';

describe('ProductoAddComponent', () => {
  let component: ProductoAddComponent;
  let fixture: ComponentFixture<ProductoAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,FormsModule,HttpModule],
      declarations: [ ProductoAddComponent ],
      providers: [AuthenticationService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoAddComponent);
    component = fixture.componentInstance;
    component.currentUser = JSON.stringify({ username: 'username', token: 'token', idUser: 'idUser'})
    fixture.detectChanges();
  });

  // TEST DE CREACION DEL COMPONENTE
  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
