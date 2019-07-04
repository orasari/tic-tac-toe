import React, {Component} from 'react';
import '../App.css';
import { connect } from 'react-redux';
import ReadyToGo from '../components/ReadyToGo';
import Game from '../components/Game';
import { store } from '../store';
import WinnerPage from '../components/WinnerPage';
import { addWinner, updateHistory, putSelectedSquaresInAppStore } from '../actions/actionCreators';

class StartPage extends Component{
  constructor(props){
    super(props)
    this.onStartGame = this.onStartGame.bind(this)    
    this.onStartAgain = this.onStartAgain.bind(this)
    this.state = {
      gameStarted: false
    }
  }

  componentDidMount(){
    const {dispatch} = this.props;
    dispatch(updateHistory(JSON.parse(localStorage.getItem('history'))));
  }

  onStartGame(){
    this.setState({gameStarted: true});
  }

  onStartAgain(){
    const {dispatch} = this.props;
    this.setState({gameStarted: true});
    dispatch(addWinner(null));
    dispatch(updateHistory(null));
    dispatch(putSelectedSquaresInAppStore(null));
  }

  render(){
  let randomValue = parseInt(Math.random() * 2) ?  true : false;
  return (
    <div className="startPage">
      <header className="StarPage-header">
        {!this.state.gameStarted && !this.props.history?
          <ReadyToGo onStartGame={this.onStartGame}></ReadyToGo>
          : <div>
          {this.props.winner ?  
          <WinnerPage onStartAgain={this.onStartAgain}></WinnerPage> 
          :
          <Game redPlayer={randomValue}></Game>
        } 
        </div>
        }
      </header>
    </div>
  );
}
}
function mapStateToProps(state, ownProps){
  let myStore = store.getState();
  return {
    winner: myStore.winner,
    history: myStore.history
  }
}
export default connect(mapStateToProps)(StartPage);
