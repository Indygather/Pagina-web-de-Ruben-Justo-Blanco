import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { RegisterComponent } from './register.component';

import { AuthenticationService } from '../../auth/authentication.service';
import { User } from '../../models/user';
import { Response } from '../../models/Response';
import { Observable } from 'rxjs/Observable';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule,RouterTestingModule, FormsModule ],
      declarations: [ RegisterComponent ],
      providers: [ AuthenticationService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create RegisterComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should register a new user', () => {
    let service = TestBed.get(AuthenticationService);
    let newUser = new User(null,'','','','','','');
    let response = new Response('success',200,newUser);
    spyOn(service, 'register').and.returnValue(Observable.from([response]));
    component.register();
    expect(component.error).toBeNull();
  });

  it('should give an error if something is wrong in register form', () => {
    let service = TestBed.get(AuthenticationService);
    let newUser = new User(null,'','','','','','');
    let response = new Response('error',400,newUser);
    spyOn(service, 'register').and.returnValue(Observable.from([response]));
    component.register();
    expect(component.error).not.toBeNull();
  });
});
