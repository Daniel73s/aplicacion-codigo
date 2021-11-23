import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisanunciosPage } from './misanuncios.page';

describe('MisanunciosPage', () => {
  let component: MisanunciosPage;
  let fixture: ComponentFixture<MisanunciosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisanunciosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisanunciosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
