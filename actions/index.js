export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const RECEIVE_ONE_DECK = 'RECEIVE_ONE_DECK'
export const ADD_ENTRY = 'ADD_ENTRY'

export function receiveOneDeck (deck) {
  console.log('RECEIVE_ONE_DECK: ', deck)
  return {
    type: RECEIVE_ONE_DECK,
    deck,
  }
}

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