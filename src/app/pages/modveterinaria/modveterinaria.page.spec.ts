import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModveterinariaPage } from './modveterinaria.page';

describe('ModveterinariaPage', () => {
  let component: ModveterinariaPage;
  let fixture: ComponentFixture<ModveterinariaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModveterinariaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModveterinariaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
