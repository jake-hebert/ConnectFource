import { Card, Drawer, Button, Empty, Col } from 'antd';
import * as React from 'react';

interface NewGameProps{
    onResetBoard(cols : number, rows : number) : void,
    rowNum : number,
    colNum : number
  }
  
  export class NewGame extends React.Component<NewGameProps, null>{
    handleClick = () => {
      let rn : number = this.props.rowNum;
      let cn : number = this.props.colNum;
      this.props.onResetBoard(rn, cn);
    }
    render(){
      return(
      <div className="game-info">
        <button className="newButton" onClick={this.handleClick}>
          New Game
        </button>
        <div className="title"> Welcome to ConnectFource! </div>
        <br/> Do you really need instructions? Connect four dots of the same color!
        <div className="chatWindow">
          chats... chats... chats...
        </div>
      </div>
      );
    }
  }
  