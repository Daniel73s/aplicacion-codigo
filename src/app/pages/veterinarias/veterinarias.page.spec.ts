import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VeterinariasPage } from './veterinarias.page';

describe('VeterinariasPage', () => {
  let component: VeterinariasPage;
  let fixture: ComponentFixture<VeterinariasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeterinariasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VeterinariasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
