export function checkWhosWinner(xSquares, oSquares, posibleSolution){
    if(xSquares && xSquares.includes(posibleSolution[0]) && xSquares.includes(posibleSolution[1])  && xSquares.includes(posibleSolution[2])){
        return "X";
    }else if(oSquares && oSquares.includes(posibleSolution[0]) && oSquares.includes(posibleSolution[1])  && oSquares.includes(posibleSolution[2])){
        return "O";
    } else return;
}

export function prepareFromStorage(localStorageObject){
    let xSqaureArrayNumbers = [];
    if(localStorageObject){
    localStorageObject.replace(',','');
    let xSqaureArray = localStorageObject.split("");    
    xSqaureArray.map((item, i)=>{
      xSqaureArrayNumbers.push(parseInt(item));
    })
    }
    return xSqaureArrayNumbers;
  }