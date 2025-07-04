// square.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent {
  @Input() value: 'X' | 'O' | null = null;
  @Output() click = new EventEmitter<void>();

  onClick() {
    this.click.emit();
  }
}