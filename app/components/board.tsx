import { Card, Drawer, Button, Empty, Col } from 'antd';
import * as React from 'react';
import { Square } from './square';

  interface BoardProps {
    squareArr : SquareStatus[] [],
    turn : Turn,
    onPlayPiece(row: number, col: number) : void,
    winner : SquareStatus
  }
  
 export class Board extends React.Component<BoardProps, any> {  
    constructor(props: BoardProps) {
      super(props);
    }
  
    gridGen = () =>{
      let grid = [];
      for(let i = 0; i < this.props.squareArr.length; i++){
        let rows = [];
        for(let j = 0; j < this.props.squareArr[i].length; j++){
          rows.push(<Square 
            key={i + 'x' + j} // put a character between row and column so it doesn't actually add the numbers
            row={i} 
            col={j}
            onPlayPiece = {this.props.onPlayPiece}
            turn = {this.props.turn}
            squareArr = {this.props.squareArr}
          />);
        }
        grid.push(
          <div key={i}>
            {rows}
          </div>
        )
      }
      return grid;
    }
  
    render() {
      const status = this.props.winner === 'Empty' ? 'Next player: ' + this.props.turn : this.props.winner + ' has won!';
      const grid = this.gridGen();
      return (
        <div>
          <div className="status">{status}</div>
          {grid}
        </div>
      );
    }
  }