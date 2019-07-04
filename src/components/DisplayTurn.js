import React from 'react';
import '../App.css';

function DisplayTurn(props) {
    let xPlayer = props.redPlayer ? "X" : "O";
  return (
    <div className="displayTurn offset-1 col-10">
     <strong>Player {xPlayer}'s turn</strong>
    </div>
  );
}

export default DisplayTurn;
