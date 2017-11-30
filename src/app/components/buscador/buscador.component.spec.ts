import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { BuscadorComponent } from './buscador.component';
import { MenuComponent } from '../menu/menu.component';
import { FiltersSectionComponent } from '../filters-section/filters-section.component';
import { ProductosListComponent } from '../productos-list/productos-list.component';

import { AuthenticationService } from '../../auth/authentication.service';

describe('BuscadorComponent', () => {
  let component: BuscadorComponent;
  let fixture: ComponentFixture<BuscadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule,RouterTestingModule, FormsModule ],
      declarations: [ BuscadorComponent,MenuComponent,FiltersSectionComponent,ProductosListComponent ],
      providers: [ AuthenticationService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorComponent);
    component = fixture.componentInstance;
    component.show = false;
    fixture.detectChanges();
  });

  it('should create BuscadorComponent', () => {
    expect(component).toBeTruthy();
  });
});
