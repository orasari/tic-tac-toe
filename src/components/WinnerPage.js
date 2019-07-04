import React, {Component} from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { store } from '../store';


class WinnerPage extends Component{
  componentWillUnmount(){
    localStorage.clear();
  }

  render(){
  const {winner} = this.props;
  return (
    <div>
    {winner === 'Its a tie' ?
      <div className="winnerPage">
        <div className="playerStrong"><strong>{winner}</strong></div>      
      <div className="offset-5 col-2"><hr></hr></div>
        <button onClick={this.props.onStartAgain} className="playAgainButton">Play again</button>
      </div> 
    :
    <div className="winnerPage">
      <div className="playerStrong"><strong>Player {winner} wins</strong></div>
        <div className="offset-5 col-2"><hr></hr></div>
        <p>What a shame  <strong>player {winner==="X" ? "O" : "X" } </strong>, looks like you aren't good enough, want to try your luck again?</p>
        <button onClick={this.props.onStartAgain} className="playAgainButton">Play again</button>
    </div>
  }
  </div>
  );
}
}
function mapStateToProps(state, ownProps){
  let myStore = store.getState();
  return {
    winner: myStore.winner
  }
}
export default connect(mapStateToProps)(WinnerPage);
