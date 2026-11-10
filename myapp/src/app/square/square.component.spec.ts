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

  it('should apply the x class when value is X', () => {
    fixture.componentRef.setInput('value', 'X');
    fixture.detectChanges();
    const btn: HTMLElement = fixture.nativeElement.querySelector('button');
    expect(btn.classList).toContain('x');
    expect(btn.classList).not.toContain('o');
  });

  it('should apply the o class when value is O', () => {
    fixture.componentRef.setInput('value', 'O');
    fixture.detectChanges();
    const btn: HTMLElement = fixture.nativeElement.querySelector('button');
    expect(btn.classList).toContain('o');
    expect(btn.classList).not.toContain('x');
  });
});
