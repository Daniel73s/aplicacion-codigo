import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModanuncioPage } from './modanuncio.page';

describe('ModanuncioPage', () => {
  let component: ModanuncioPage;
  let fixture: ComponentFixture<ModanuncioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModanuncioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModanuncioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
