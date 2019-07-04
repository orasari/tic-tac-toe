import React, {Component} from 'react';
import '../App.css';
import { connect } from 'react-redux';
import DisplayTurn from './DisplayTurn';
import Board from './Board';
import History from './History';
import { putSelectedSquaresInAppStore, toggleNextPalyer, updateHistory, addSquare, addWinner } from '../actions/actionCreators';
import { store } from '../store';
import { checkWhosWinner, prepareFromStorage } from '../constants';

const solutions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
class Game extends Component{
  constructor(props){
    super(props)
    this.onSquareClick = this.onSquareClick.bind(this)
    this.checkWinner = this.checkWinner.bind(this)    
    this.onUndo = this.onUndo.bind(this)
    this.state = {
      disabledSquare: [],
      clicked: false,
      winner: ""
    }
  }
  
  componentWillUnmount(){
    localStorage.clear();
  }

  componentDidMount(){
    const {dispatch} = this.props;
    dispatch(toggleNextPalyer(false));
    dispatch(updateHistory(JSON.parse(localStorage.getItem('history'))));
    let newNext = localStorage.getItem('oIsNext') === 'false' ? false : true
    dispatch(toggleNextPalyer(newNext));
    let xSqaureArrayNumbers = prepareFromStorage(localStorage.getItem('xSquares'))
    let oSqaureArrayNumbers = prepareFromStorage(localStorage.getItem('oSquares'))
    dispatch(addSquare(xSqaureArrayNumbers, "X"));
    dispatch(addSquare(oSqaureArrayNumbers, "O"));
    dispatch(putSelectedSquaresInAppStore(JSON.parse(localStorage.getItem('selectedSquares'))));   
    
  }

  onUndo(item){
    const {dispatch, history, oIsNext, xSquares, oSquares} = this.props;  
    let currentHistory = [...history];
    let disabledSquare = this.state.disabledSquare;

    currentHistory.map((element, i) => {
      if(element===item){
        currentHistory.splice(i, 1);
          disabledSquare.splice(i, 1);
          dispatch(toggleNextPalyer(!oIsNext));
      }
    })

    let newMap = currentHistory.reduce(function(map, obj){
      map[obj.square] = obj.player;
      return map;
    }, {})
    
    this.props.dispatch(updateHistory(currentHistory));
    this.props.dispatch(putSelectedSquaresInAppStore(newMap));
    this.setState({disabledSquare: disabledSquare});
    
    localStorage.setItem('oIsNext',oIsNext);
    localStorage.setItem('history',JSON.stringify(currentHistory));
    localStorage.setItem('xSquares',xSquares);
    localStorage.setItem('oSquares',oSquares);
    localStorage.setItem('selectedSquares',JSON.stringify(newMap));
  }

  checkWinner(xSquares, oSquares){
    const {dispatch} = this.props;
    
    solutions.map((item, index) => {
      let posibleSolution = item;
      let winner = checkWhosWinner(xSquares, oSquares, posibleSolution)
      if(oSquares.length+xSquares.length === 9 && !winner){
        dispatch(addWinner("Its a tie"));
      }
      if(winner) dispatch(addWinner(winner));
    })    
  }

  onSquareClick(i){
    const {dispatch, oIsNext, history} = this.props;
    let xSquares = [];
    let oSquares = []; 
    let currentHistory = history ? [...history] : [];
    let disabledSquare = [];

    dispatch(toggleNextPalyer(!oIsNext));  
    currentHistory.push({player: oIsNext ? 1 : 0, square: i})
    dispatch(updateHistory(currentHistory))

    for(let i=0; i<currentHistory.length; i++){
      currentHistory[i].player === 1 ? xSquares.push(currentHistory[i].square) : oSquares.push(currentHistory[i].square);
      disabledSquare.push(currentHistory[i].square);
    }

    dispatch(addSquare(xSquares, "X"));
    dispatch(addSquare(oSquares, "O"));

    let newMap = currentHistory.reduce(function(map, obj){
      map[obj.square] = obj.player;
      return map;
    }, {})

    this.setState({disabledSquare: disabledSquare});

    this.props.dispatch(putSelectedSquaresInAppStore(newMap));
    this.setState({clicked: !this.state.clicked});
    this.checkWinner(xSquares, oSquares);
    localStorage.setItem('oIsNext',!oIsNext);
    localStorage.setItem('history',JSON.stringify(currentHistory));
    localStorage.setItem('xSquares',xSquares);
    localStorage.setItem('oSquares',oSquares);
    localStorage.setItem('selectedSquares',JSON.stringify(newMap));
  }

  render(){
  const {oIsNext, history, xSquares, oSquares} = this.props

  return (
    <div>
      <DisplayTurn redPlayer={oIsNext}></DisplayTurn>
      <div className="offset-1 col-10 game">
      <div className="row">
      
      <div className="col-xs-12 col-lg-7">
      <Board 
      oIsNext={oIsNext}
      history={history}
      onSquareClick={this.onSquareClick}
      disabledSquare = {this.state.disabledSquare}
      rerender={this.state.clicked}
      ></Board>
      </div>
      <div className="col-xs-12 col-lg-3">
      <History onUndo={this.onUndo} history={history} xSquares={xSquares} oSquares={oSquares}></History>
      </div>
      </div>
      </div>
    </div>
  );
}
}

function mapStateToProps(state, ownProps){
  let myStore = store.getState();
  return {
    oIsNext: myStore.oIsNext,
    history: myStore.history,
    xSquares: myStore.xSquares,
    oSquares: myStore.oSquares,
    winner: myStore.winner
  }
}

export default connect(mapStateToProps)(Game);
