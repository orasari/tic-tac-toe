import { PUT_SELECTED_SQUARES_IN_APP_STORE, TOGGLE_NEXT_PLAYER, UPDATE_HISTORY, ADD_WINNER, ADD_SQUARE } from "./actionTypes";

export function putSelectedSquaresInAppStore(selectedSquares){
    return {
        type: PUT_SELECTED_SQUARES_IN_APP_STORE,
        selectedSquares: selectedSquares
      }
}
export function toggleNextPalyer(oIsNext){
    return {
        type: TOGGLE_NEXT_PLAYER,
        oIsNext: oIsNext
      }
}


export function updateHistory(history){
    return {
        type: UPDATE_HISTORY,
        history: history
      }
}
export function addSquare(square, symbol){
    return {
        type: ADD_SQUARE,
        square: square,
        symbol: symbol
      }
}

export function addWinner(winner){
    return {
        type: ADD_WINNER,
        winner: winner
      }
}