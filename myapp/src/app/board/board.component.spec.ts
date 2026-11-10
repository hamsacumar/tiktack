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

  it('should color the player badge for the current player', () => {
    const badge: HTMLElement = fixture.nativeElement.querySelector('.player-badge');
    expect(badge.classList).toContain('x');

    component.xIsNext = false;
    fixture.detectChanges();
    expect(badge.classList).toContain('o');
    expect(badge.classList).not.toContain('x');
  });
});
