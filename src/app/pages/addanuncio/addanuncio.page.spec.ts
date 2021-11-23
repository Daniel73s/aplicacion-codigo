import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddanuncioPage } from './addanuncio.page';

describe('AddanuncioPage', () => {
  let component: AddanuncioPage;
  let fixture: ComponentFixture<AddanuncioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddanuncioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddanuncioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
