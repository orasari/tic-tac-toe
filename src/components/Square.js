import React from 'react';

export default function Square(props) {
  let renderValue = "N";
  let disabled = props.disabledSquare.indexOf(props.squareIndex) > -1;
  let classes = [];
  if(disabled){
    classes.push("disabled ");
  }
  if(props.value===1){
    classes.push("xStyle");
    renderValue="X";
  }
  if(props.value===0){
    classes.push("oStyle");
    renderValue="O";
  }

  return (
  <button disabled={disabled} className={classes.join(" ")} onClick={()=>{props.onSquareClick()}}>
    {renderValue}
  </button>
  )  
}