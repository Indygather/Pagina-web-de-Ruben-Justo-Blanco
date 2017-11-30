import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { FiltersSectionComponent } from './filters-section.component';
import { AuthenticationService } from '../../auth/authentication.service';
import { ProductService } from '../../services/product.service';
import { Filters } from '../../models/Filters';

describe('FiltersSectionComponent', () => {
  let component: FiltersSectionComponent;
  let fixture: ComponentFixture<FiltersSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltersSectionComponent ],
      imports: [ HttpModule,RouterTestingModule, FormsModule ],
      providers: [ AuthenticationService, ProductService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create FiltersSectionComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should set user filters', () => {
    component.userFilters = new Filters('prueba','seller',0,0,0);
    component.setFilters();
    let storedUserFilters: Filters = Object.assign(new Filters('','',0,0,0), JSON.parse(localStorage.getItem('userFilters')));
    expect(component.userFilters).toEqual(storedUserFilters);
  });

  it('should clean user filters', () => {
    component.userFilters = new Filters('prueba','seller',0,0,0);
    let resetFilters = new Filters('','',null,null,null);
    component.limpiarFiltros();
    expect(component.userFilters).toEqual(resetFilters);
  });
});
