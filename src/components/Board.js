import React, {Component} from 'react';
import '../App.css';
import { connect } from 'react-redux';
import Square from './Square';
import { store } from '../store';
import { updateHistory } from '../actions/actionCreators';


class Board extends Component{
  constructor(props){
    super(props);
    this.createBoard = this.createBoard.bind(this);
  }

  componentDidUpdate(prevProps, prevState){
   if(this.props!==prevProps){
     this.props.dispatch(updateHistory(this.props.history));
   }
}

  createBoard(row, col){
    const board = [];
    let cellCounter = 0; 

    for (let i = 0; i < row; i += 1) {
      const columns = [];
      for (let j = 0; j < col; j += 1) {
        columns.push(this.renderSquare(cellCounter++));
      }
      board.push(<div key={i} className="board-row">{columns}</div>);
    }

    return board;
  }

  renderSquare(i) {
    const playerColor = this.props.oIsNext
        ? 'x'
        : 'o';

    let pickedValues = this.props.selectedSquares ? this.props.selectedSquares : {};
    let squareValue = pickedValues[i];
    return (
      <Square
      playerColor={playerColor}
        key={i}
        squareIndex={i}
        disabledSquare={this.props.disabledSquare}
        value={squareValue}
        onSquareClick={() => {
          this.props.onSquareClick(i)
        }}
      />
    );
  }


  render(){
  return (
    <div className="boardGame">
      <div>{this.createBoard(3, 3)}</div>
    </div>
  );
}
}

function mapStateToProps(state, ownProps){
  let myStore = store.getState();
  return {
    selectedSquares: myStore.selectedSquares,
    oIsNext: myStore.oIsNext
  }
}

export default connect(mapStateToProps)(Board);
