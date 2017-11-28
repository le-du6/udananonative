import { RECEIVE_DECKS, ADD_ENTRY } from '../actions'
// import { initialDecks } from '../utils/_decksPureData'
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

const decks = (state = init1, action) => {
  switch (action.type) {
    case RECEIVE_DECKS :
      // console.log('action.decks: ', action.decks)
      return {
        ...state,
        ...action.decks,
        // ...init2,
        // ...{ decks: state.decks.concat(init2.decks) }
        // ...{b: {title:'UTIL', questions: ["L"]}}
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