import { Card, Drawer, Button, Empty, Col } from 'antd';
import * as React from 'react';
import { Board } from './board';
import { NewGame } from './newGame';

interface GameState{
    numOfRows : number,
    numOfColumns : number,
    squareStatuses: SquareStatus[] [],
    turn: Turn,
    winner: SquareStatus
  }
  
export class Game extends React.Component<any, GameState> {
    constructor(props: any) {
      super(props);
      let squareStatuses: SquareStatus[] [] = this.newSquares(6,7);
  
      this.state = {
        numOfRows : 6,
        numOfColumns : 7,
        turn: 'Red',
        squareStatuses,
        winner: 'Empty'
      };
    }
  
    newSquares = (rows : number, cols : number) : SquareStatus[] [] => {
      let ss: SquareStatus[] [] = [];
        for(let i = 0 ; i < rows; i++){
          let squareCol: SquareStatus[] = [];
        for(let j = 0 ; j < cols; j++){
          squareCol.push('Empty');
        }
        ss.push(squareCol);
      }
      return ss;
    }
  
    resetBoard = (rows : number, cols : number) : void => {
      let newBoard : SquareStatus[] [] = this.newSquares(rows, cols);
      this.setState({
        numOfRows : rows,
        numOfColumns : cols,
        turn: 'Red',
        squareStatuses: newBoard,
        winner: 'Empty'
      });
    }
  
    playPiece = (row: number, col: number) => {
      if(this.state.winner !== 'Empty'){
        alert(this.state.winner + ' has won! You can start a new game with the "New Game" button');
        return;
      }
      let squareStatuses = this.state.squareStatuses;
      let bottomRow : number = row;
      
      for(let i = row; i < squareStatuses.length; i++){
        if(squareStatuses[i + 1] === undefined){
          break;
        }

        if(squareStatuses[i + 1][col] === 'Empty'){
          bottomRow ++;
        } else {
          break;
        }
      }
      squareStatuses[bottomRow][col] = this.state.turn;
      let winner = this.checkWinner(squareStatuses);      
      const turn = this.state.turn === 'Red' ? 'Yellow' : 'Red';
      this.setState({
        turn,
        squareStatuses,
        winner
      });
    }
    
    checkWinner = (squareStatuses : SquareStatus[][]) : SquareStatus => {
      // Since we know we are starting the evaluation in the top left
      // corner of the board each time, we only need to check in 4 directions
      // 1) Down
      // 2) Right
      // 3) Diagonal (Down/Right)
      // 4) Diagonal (Up/Right)

      // Set the condition for the number of cells in a row needed
      const winCondition = 4;
      const currentPlayer = this.state.turn;
      
      // look at each row starting at the top and going down
      for(let i = 0; i < squareStatuses.length; i++){
        for(let j = 0; j < squareStatuses[i].length; j++){
          // Only need to check if the last player to play a piece won
          if(squareStatuses[i][j] === currentPlayer){
            // 1) check down
            let downContiguious = 1;
            let downIncrement = i + 1;
            while(downContiguious < winCondition){
              if(squareStatuses[downIncrement] === undefined){
                break;
              }
              if(squareStatuses[downIncrement][j] === currentPlayer){
                downContiguious ++;
                downIncrement ++;
              } else {
                break;
              }
            }
            if(downContiguious === winCondition){
              return currentPlayer;
            }
            // 2) check right
            let rightContiguious = 1;
            let rightIncrement = j + 1;
            while(rightContiguious < winCondition){
              if(squareStatuses[i][rightIncrement] === undefined){
                break;
              }
              if(squareStatuses[i][rightIncrement] === currentPlayer){
                rightContiguious ++;
                rightIncrement ++;
              } else {
                break;
              }
            }
            if(rightContiguious === winCondition){
              return currentPlayer;
            }

            // 3) check diagonal up/right
            let diagUR_Contiguious = 1;
            let diagUR_upDecrement = i - 1;
            let diagUR_rtIncrement = j + 1;
            while(diagUR_Contiguious < winCondition){
              if(squareStatuses[diagUR_upDecrement] === undefined 
                || squareStatuses[diagUR_upDecrement][diagUR_rtIncrement] === undefined
              ){
                break;
              }
              if(squareStatuses[diagUR_upDecrement][diagUR_rtIncrement] === currentPlayer){
                diagUR_Contiguious ++;
                diagUR_upDecrement --;
                diagUR_rtIncrement ++;
              } else {
                break;
              }
            }
            if(diagUR_Contiguious === winCondition){
              return currentPlayer
            }

            // 4) check diagonal down/right
            let diagDR_Contiguious = 1;
            let diagDR_dnIncrement = i + 1;
            let diagDR_rtIncrement = j + 1;
            while(diagDR_Contiguious < winCondition){
              if(squareStatuses[diagDR_dnIncrement] === undefined 
                || squareStatuses[diagDR_dnIncrement][diagDR_rtIncrement] === undefined
              ){
                break;
              }
              if(squareStatuses[diagDR_dnIncrement][diagDR_rtIncrement] === currentPlayer){
                diagDR_Contiguious ++;
                diagDR_dnIncrement ++;
                diagDR_rtIncrement ++;
              } else {
                break;
              }
            }
            if(diagDR_Contiguious === winCondition){
              return currentPlayer
            }
          }
        }
      }
      return 'Empty';
    }

    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board key='gameboard' 
              squareArr={this.state.squareStatuses} 
              turn={this.state.turn} 
              onPlayPiece={this.playPiece} 
              winner={this.state.winner}
            />
          </div>
          <div>
            <NewGame key='newgamesection' colNum={this.state.numOfColumns} rowNum={this.state.numOfRows} onResetBoard = {this.resetBoard}/>
          </div>
        </div>
      );
    }
  }