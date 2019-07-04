import React, {Component} from 'react';
import '../App.css';
import { connect } from 'react-redux';


class ReadyToGo extends Component{
  render(){
  return (
    <div className="winnerPage">
      <div className="playerStrong"><strong>Ready to go?</strong></div>      
      <div className="offset-5 col-2"><hr></hr></div>
        <p>When you click begin, we will randomly choose a player to start</p>
        <button className="beginButton" onClick={this.props.onStartGame}>Begin</button>
    </div>
  );
}
}

export default connect()(ReadyToGo);
