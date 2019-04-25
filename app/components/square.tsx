import { Card, Drawer, Button, Empty, Col } from 'antd';
import * as React from 'react';

// example use of file loader to load image
import emptyCell from '@src/assets/images/EmptyCell.png';
import redCell from '@src/assets/images/RedCell.png';
import yelCell from '@src/assets/images/YellowCell.png';

  interface SquareProps { 
    turn: Turn,
    onPlayPiece(row: number, col: number): void,
    col: number,
    key: string,
    row: number,
    squareArr : SquareStatus[] []
  }
  
 export class Square extends React.Component<SquareProps, never>{
    constructor(props: SquareProps){
      super(props);
    }
    handleClick = () => { 
      const sq : SquareStatus = this.props.squareArr[this.props.row][this.props.col];
      if(sq === 'Empty'){
        this.props.onPlayPiece(this.props.row, this.props.col);
      }
    }
  
    render() {
      
      const sq : SquareStatus = this.props.squareArr[this.props.row][this.props.col];
      let srcStr : string;
      if(sq === 'Empty'){
        srcStr = emptyCell;
      } else if (sq === 'Red'){
        srcStr = redCell;
      } else {
        srcStr = yelCell;
      }
  
      return (
        <button className="square" onClick={this.handleClick}>
          <img src={srcStr} alt={sq} width="100%" height="100%" />
        </button>
      );
    }
  }