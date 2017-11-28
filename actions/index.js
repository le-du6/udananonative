export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_ENTRY = 'ADD_ENTRY'

export function receiveDecks (decks) {
  // console.log(decks)
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function addEntry (entry) {
  return {
    type: ADD_ENTRY,
    entry,
  }
}