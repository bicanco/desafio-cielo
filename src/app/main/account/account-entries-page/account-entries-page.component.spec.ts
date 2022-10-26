import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountEntriesPageComponent } from './account-entries-page.component';

describe('AccountDetailsPageComponent', () => {
  let component: AccountEntriesPageComponent;
  let fixture: ComponentFixture<AccountEntriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountEntriesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountEntriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
