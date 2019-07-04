import { PUT_SELECTED_SQUARES_IN_APP_STORE, TOGGLE_NEXT_PLAYER, UPDATE_HISTORY, ADD_WINNER, ADD_SQUARE } from "../actions/actionTypes";

const reducer = (state = {}, action) => {
    switch (action.type) {
        case PUT_SELECTED_SQUARES_IN_APP_STORE: 
        let selectedSquares = action.selectedSquares;
        return {...state, selectedSquares}

        case TOGGLE_NEXT_PLAYER: 
        let oIsNext = action.oIsNext;
        return {...state, oIsNext}

        case UPDATE_HISTORY: 
        let history = action.history;
        return {...state, history}
        
                
        case ADD_SQUARE:
        let xSquares;
        let oSquares;
        if(action.symbol === "X") {
            xSquares = action.square;
        }
        if(action.symbol === "O") {
            oSquares = action.square;
        }        
        return {...state, xSquares, oSquares}

        case ADD_WINNER: 
        let winner = action.winner;
        return {...state, winner}

        default: return state;
    }
}
export default reducer;
