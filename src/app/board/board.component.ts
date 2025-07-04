// board.component.ts
import { Component, OnInit } from '@angular/core';
import { SquareComponent } from '../square/square.component';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-board',
  imports: [SquareComponent, CommonModule],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'] 
})
export class BoardComponent implements OnInit {
  grid!: any[][];  
  xIsNext!: boolean;
  winner!: string | null;  

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.grid = Array(3).fill(null).map(() => Array(3).fill(null));
    this.winner = null;
    this.xIsNext = true;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';  
  }

  makeMove(rowIndex: number, colIndex: number) {
    // Check if game is over or square is already filled
    if (this.winner || this.grid[rowIndex][colIndex]) {
      return;
    }

    // Make the move
    this.grid[rowIndex][colIndex] = this.player;
    
    // Add rotation animation
    const boardElement = document.querySelector('.board');
    if (boardElement) {
      boardElement.classList.add('rotate-animation');
      
      // Remove the class after animation completes
      setTimeout(() => {
        boardElement.classList.remove('rotate-animation');
      }, 800);
    }
    
    // Switch player
    this.xIsNext = !this.xIsNext;
    
    // Check for winner
    this.winner = this.calculateWinner();
  }

  calculateWinner(): string | null {
    const lines = [
      // Rows
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      // Columns
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      // Diagonals
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.grid[a[0]][a[1]] &&
        this.grid[a[0]][a[1]] === this.grid[b[0]][b[1]] &&
        this.grid[a[0]][a[1]] === this.grid[c[0]][c[1]]
      ) {
        return this.grid[a[0]][a[1]];
      }
    }
    return null;
  }
}

