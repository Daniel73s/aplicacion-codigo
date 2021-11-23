import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfovetPage } from './infovet.page';

describe('InfovetPage', () => {
  let component: InfovetPage;
  let fixture: ComponentFixture<InfovetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfovetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfovetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
