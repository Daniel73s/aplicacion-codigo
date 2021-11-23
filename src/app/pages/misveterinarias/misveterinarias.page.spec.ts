import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisveterinariasPage } from './misveterinarias.page';

describe('MisveterinariasPage', () => {
  let component: MisveterinariasPage;
  let fixture: ComponentFixture<MisveterinariasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisveterinariasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisveterinariasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
