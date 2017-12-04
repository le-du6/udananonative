import {
  RECEIVE_DECKS,
  RECEIVE_ONE_DECK,
  SAVE_DECK,
  ADD_CARD,
 } from '../actions'
import { initialDecks } from '../utils/_decksPureData'

const decks = (state = { decks: initialDecks}, action) => {
  switch (action.type) {
    case ADD_CARD :
      return {
        ...state,
      }
    case SAVE_DECK :
      return {
        ...state,
      }
    case RECEIVE_DECKS :
      return {
        ...state,
        decks: [...action.decks['decks']]
      }
    case RECEIVE_ONE_DECK :
      return {
        ...state,
        currentDeck: {...action.deck}
      }
    default :
      return state
  }
}

export default decks
