import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudvehiculoComponent } from './crudvehiculo.component';

describe('CrudvehiculoComponent', () => {
  let component: CrudvehiculoComponent;
  let fixture: ComponentFixture<CrudvehiculoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudvehiculoComponent]
    });
    fixture = TestBed.createComponent(CrudvehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
