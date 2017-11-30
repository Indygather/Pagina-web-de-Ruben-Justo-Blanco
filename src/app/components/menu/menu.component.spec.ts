import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { MenuComponent } from './menu.component';

import { AuthenticationService } from '../../auth/authentication.service';
import { Filters } from '../../models/Filters';

class RouterStub {
  navigate(params){
  }
}

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule,RouterTestingModule, FormsModule ],
      declarations: [ MenuComponent ],
      providers: [ AuthenticationService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create MenuComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should give login error with invalid credentials', () => {
    let service = TestBed.get(AuthenticationService);
    spyOn(service, 'login').and.returnValue(Observable.from([false]));
    component.login();
    expect(component.error).toBe('Username or password is incorrect');
  });

  it('should give login OK with valid credentials', () => {
    let service = TestBed.get(AuthenticationService);
    spyOn(service, 'login').and.returnValue(Observable.from([true]));
    component.login();
    expect(component.error).toBeNull();
  });

  it('should navigate to CV in logout and reset currentUser and userFilters', () => {
    let userFilters = new Filters('example','user',0,0,0);
    localStorage.setItem('userFilters', JSON.stringify(this.userFilters));
    localStorage.setItem('currentUser', JSON.stringify({ username: 'username', token: 'token', idUser: 'idUser'}));
    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigate');
    component.logout();
    var currentUser = localStorage.getItem('currentUser');
    var storedUserFilter = localStorage.getItem('userFilters');
    expect(spy).toHaveBeenCalledWith(['cv']);
    expect(currentUser).toBeNull();
    expect(storedUserFilter).toBeNull();
  });
});
