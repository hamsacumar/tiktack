import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareComponent } from './square.component';

describe('SquareComponent', () => {
  let component: SquareComponent;
  let fixture: ComponentFixture<SquareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an empty cell without player classes', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button.cell');
    expect(button.classList).not.toContain('x');
    expect(button.classList).not.toContain('o');
    expect(button.getAttribute('aria-label')).toBe('Empty square');
  });

  it('should apply the x class for X', () => {
    fixture.componentRef.setInput('value', 'X');
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button.cell');
    expect(button.classList).toContain('x');
    expect(button.textContent?.trim()).toBe('X');
  });

  it('should apply the o class for O', () => {
    fixture.componentRef.setInput('value', 'O');
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button.cell');
    expect(button.classList).toContain('o');
  });
});
