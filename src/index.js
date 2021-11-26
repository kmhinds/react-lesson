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
        if (this.props.player === 1) {
            this.setState({value: 'X'})
            this.props.setGameState({
                player: 2
            })
        } else {
            this.setState({value: 'O'})
            this.props.setGameState({
                player: 1
            })
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
      return <Square player={this.props.player} setGameState={this.props.setGameState} value={i} />;
    }
  
    render() {
      const status = `Player: ${this.props.player}`;
  
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
        }
    }

    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board player={this.state.player} setGameState={this.setState.bind(this)} />
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
  