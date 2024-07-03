import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudpersonaComponent } from './crudpersona.component';

describe('CrudpersonaComponent', () => {
  let component: CrudpersonaComponent;
  let fixture: ComponentFixture<CrudpersonaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudpersonaComponent]
    });
    fixture = TestBed.createComponent(CrudpersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
