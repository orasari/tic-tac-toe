import React, {Component} from 'react';
import '../App.css';
import { connect } from 'react-redux';


class History extends Component{

  render(){
  const {history} = this.props;
  let turns;
  let cssClasses = [];
  if(history && history.length>0){
    turns = history.map((item, index) => {
      let renderUndo = false;
      if(index === history.length-1 || index === history.length-2) {
        renderUndo = true;
      }
      let disableUndo = true;
      if(index === history.length-1) {
        disableUndo = false;        
      }

      if(index !== history.length-1){
        cssClasses = ["row","turn", "borderTurn"];
      }else {
        cssClasses = ["row","turn"];
      }

      return(
        <div key={index} className={cssClasses.join(' ')}>
          <div className="playerTurnDiv col-8">
          <p key={index}>Player <strong>{item.player===1 ? "X" : "O"}</strong> chose cell {item.square+1}</p>
          </div>
          {renderUndo &&
          <div className="undoButtonDiv col-4">
          <button disabled={disableUndo} key={index} onClick={()=>this.props.onUndo(item)} className="undoButton">Undo</button>
            </div> 
          }        
      </div>
    )}
      
    )
  }
    
  return (
    <div>
      <div className="historyHeader col-12">
        <strong>Turn History</strong>
      </div>
      {turns && turns.length>0 ? 
      <div className="historyPlayer col-12">{turns}</div>
      :
      <div className="noTurnsMade col-12">Currently no turns made</div>
      }
    </div>
  );
}
}

export default connect()(History);
