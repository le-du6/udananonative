import {
  RECEIVE_DECKS,
  RECEIVE_ONE_DECK,
  ADD_ENTRY
 } from '../actions'
// import { initialDecks } from '../utils/_decksPureData'

const decks = (state = { decks: init1['decks'].concat(init2.decks)}, action) => {
  switch (action.type) {
    case RECEIVE_DECKS :
      // console.log(state['decks'])
      return {
        decks: [...state['decks'], ...action.decks['decks']]
      }
    case RECEIVE_ONE_DECK :
      return {
        deck: {...action.deck}
      }
    case ADD_ENTRY :
      return {
        ...state,
        ...action.entry
      }
    default :
      return state
  }
}

export default decks

const init1 = {
  decks: [
    { key: 'A/B-Tests', title:'A/B Tests', nbQuestions: 2 },
    { key: 'LearnIn20Hours', title:'Learn Anythink in 20 Hours!', nbQuestions: 3 },
  ]
}
const init2 = {
  decks: [
    { key: 'monCul', title:'Mon Cul', nbQuestions: 20 },
  ]
}
