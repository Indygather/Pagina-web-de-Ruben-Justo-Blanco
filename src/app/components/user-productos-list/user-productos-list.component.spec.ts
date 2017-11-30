import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { UserProductListComponent } from './user-productos-list.component';
import { MenuComponent } from '../menu/menu.component';

import { AuthenticationService } from '../../auth/authentication.service';
import { User } from '../../models/user';
import { ProductService } from '../../services/product.service';

describe('UserProductosListComponent', () => {
  let component: UserProductListComponent;
  let fixture: ComponentFixture<UserProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule,RouterTestingModule, FormsModule ],
      declarations: [ UserProductListComponent,MenuComponent ],
      providers: [ AuthenticationService, ProductService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProductListComponent);
    component = fixture.componentInstance;
    component.currentUser = new User(null,null,null,null,null,null,null);
    component.show = false;
    fixture.detectChanges();
  });

  it('should create UserProductosListComponent', () => {
    expect(component).toBeTruthy();
  });
});
