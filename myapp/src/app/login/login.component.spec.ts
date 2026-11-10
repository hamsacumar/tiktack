import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the form inside a glass card', () => {
    const card: HTMLElement = fixture.nativeElement.querySelector('form.auth-card.glass-card');
    expect(card).toBeTruthy();
    expect(card.querySelector('.auth-title')).toBeTruthy();
  });

  it('should disable the submit button until the form is filled', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBeTrue();
  });

  it('should show the error message in an alert', () => {
    component.errorMsg = 'Something went wrong';
    fixture.detectChanges();
    const alert: HTMLElement = fixture.nativeElement.querySelector('.alert.error');
    expect(alert.textContent).toContain('Something went wrong');
  });
});
