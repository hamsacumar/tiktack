import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render nine squares', () => {
    expect(fixture.nativeElement.querySelectorAll('app-square').length).toBe(9);
  });

  it('should show the current player badge', () => {
    const badge: HTMLElement = fixture.nativeElement.querySelector('.status .badge');
    expect(badge.textContent?.trim()).toBe('X');
    expect(badge.classList).toContain('x');
  });

  it('should show the winner banner when a player wins', () => {
    component.makeMove(0, 0); // X
    component.makeMove(1, 0); // O
    component.makeMove(0, 1); // X
    component.makeMove(1, 1); // O
    component.makeMove(0, 2); // X wins
    fixture.detectChanges();

    const banner: HTMLElement = fixture.nativeElement.querySelector('.status.winner');
    expect(banner).toBeTruthy();
    expect(banner.textContent).toContain('won the game!');
    expect(banner.querySelector('.badge')?.classList).toContain('x');
  });
});
