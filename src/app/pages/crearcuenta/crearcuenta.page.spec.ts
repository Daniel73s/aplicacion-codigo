import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearcuentaPage } from './crearcuenta.page';

describe('CrearcuentaPage', () => {
  let component: CrearcuentaPage;
  let fixture: ComponentFixture<CrearcuentaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearcuentaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearcuentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
