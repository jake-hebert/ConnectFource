import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import emptyCell from './EmptyCell.png';
import redCell from './RedCell.png';
import yelCell from './YellowCell.png';

  class Square extends React.Component {
    state = {
      status: 'Empty',
      src: emptyCell
    }

    handleClick = () =>{
      if(this.state.status === 'Empty'){
        let turnColor = this.props.getTurn();
        if(turnColor === 'Yellow'){
          // Change cell to yellow
          this.setState({ status: 'Yellow', src: yelCell });
        } else {
          // Change cell to red
          this.setState({ status: 'Red', src: redCell });
        }
        // Advance to the next turn
        this.props.advanceTurn();
      }
    }

    render() {
      //let idName = this.props.row + this.props.i;
      return (
        <button className="square" onClick={this.handleClick}>
          <img src={this.state.src} alt={this.state.status} width="100%" height="100%" />
        </button>
      );
    }
  }

  class BoardRow extends React.Component {
    /*
    constructor(props) {
      super(props);
      this.state = {
        row: '',
        cols: null,
      }
    }
    */

    renderRow = (row, cols) => {
      let rowArr = [];
      for(let i = 0; i < cols; i++){
        rowArr.push(this.renderSquare(row, i));
      }
      return rowArr;
    }

    renderSquare(row, i) {
      return (<Square 
        key={row + i} 
        row={row} 
        i={i}
        getTurn = {this.props.getTurn}
        advanceTurn = {this.props.advanceTurn}
      />);
    }

    render() {
      return (
        <div className="board-row">
          {this.renderRow(this.props.row, this.props.cols)}
        </div>
      );
    }
  }
  
  class Board extends React.Component {  
    constructor(props) {
      super(props);
      this.state = {
        colNumb: 7,
        colRows: ['a','b','c','d','e','f'],
        squares: null,
        turn: 'Red'
      };
    }

    gridGen = (rows, colNum) =>{
      let grid = [];
      for(let i = 0; i < rows.length; i++){
        grid.push(<BoardRow 
          key = {rows[i]} 
          row = {rows[i]} 
          cols = {colNum}
          getTurn = {this.getTurn}
          advanceTurn = {this.advanceTurn}
        />);
      }
      return grid;
    }

    getTurn = () =>{
      return this.state.turn;
    }

    advanceTurn = () =>{
      console.log(this.props.children);// ***Returns undefined? React.Children.Count returns 0*** 
      if(this.state.turn === 'Red'){
        this.setState({turn : 'Yellow'});
      } else {
        this.setState({turn :'Red'});
      }
    }

    render() {
      const status = 'Next player: ' + this.state.turn;
      const grid = this.gridGen(this.state.colRows,this.state.colNumb);
      return (
        <div>
          <div className="status">{status}</div>
          {grid}
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board key='gameboard'/>
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  