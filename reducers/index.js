import {
  RECEIVE_DECKS,
  RECEIVE_ONE_DECK,
  SAVE_DECK,
 } from '../actions'
import { initialDecks } from '../utils/_decksPureData'

const decks = (state = { decks: initialDecks}, action) => {
  switch (action.type) {
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

// const init1 = {
//   decks: [
//     { key: 'A/B-Tests', title:'A/B Tests', nbQuestions: 2 },
//     { key: 'LearnIn20Hours', title:'Learn Anythink in 20 Hours!', nbQuestions: 3 },
//   ]
// }
// const init2 = {
//   decks: [
//     { key: 'monCul', title:'Mon Cul', nbQuestions: 20 },
//   ]
// }
