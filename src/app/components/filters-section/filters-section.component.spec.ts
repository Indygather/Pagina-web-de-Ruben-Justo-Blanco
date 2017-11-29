import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { FiltersSectionComponent } from './filters-section.component';
import { AuthenticationService } from '../../auth/authentication.service';

describe('FiltersSectionComponent', () => {
  let component: FiltersSectionComponent;
  let fixture: ComponentFixture<FiltersSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltersSectionComponent ],
      imports: [ HttpModule,RouterTestingModule, FormsModule ],
      providers: [ AuthenticationService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
