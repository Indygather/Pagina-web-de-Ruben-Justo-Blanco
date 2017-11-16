import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProductosListComponent } from './user-productos-list.component';

describe('UserProductosListComponent', () => {
  let component: UserProductosListComponent;
  let fixture: ComponentFixture<UserProductosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProductosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProductosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
