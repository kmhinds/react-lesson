import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        };
    }

    handleClick = () => { 
        if (this.state.value !== null) {
            return
        }
        
        if (this.props.gameState.player === 1) {
            this.takeTurn(1)
        } else {
            this.takeTurn(2)
        }
    }
    
    takeTurn = (player) => {
        const newPositions = [...this.props.gameState.positions];
        const symbol = player === 1 ? 'X':'O';
        this.setState({value: symbol});
        newPositions[this.props.value] = player;
        const winner = this.getWinner(newPositions)
        this.props.setGameState({
            player: player === 1 ? 2:1,
            positions: newPositions,
            winner,
        });
    }


    // 1, 1, 1,
    // 2, 1, null,
    // 1, null, 2
    getWinner = (positions) => { // 1 or 2 or null  or 'tie'
        if (positions[0] === positions[1] && positions[1] === positions[2]) {
            return positions[0]
        } else if (positions[3] === positions[4] && positions[4] === positions[5]) {
            return positions[3]
        } else if (positions[6] === positions[7] && positions[7] === positions[8]) {
            return positions[6]
        }
    }

    render() {
      return (
        <button 
            className="square" 
            onClick={this.handleClick}
        >
          {this.state.value}
        </button>
      );
    }
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      return <Square gameState={this.props.gameState} setGameState={this.props.setGameState} value={i} />;
    }
  
    render() {
      const status = `Player: ${this.props.gameState.player}`;
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            player: 1,
            turn: 1,
            positions: new Array(9).fill(null),
            winner: null
        }
    }


    render() {
        console.log(this.state.positions)
      return (
        <div className="game">
          <div className="game-board">
            <Board gameState={this.state} setGameState={this.setState.bind(this)} />
          </div>
          <div>
              Winner:
              {this.state.winner}
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
  