export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const RECEIVE_ONE_DECK = 'RECEIVE_ONE_DECK'
export const SAVE_DECK = 'SAVE_DECK'
export const ADD_CARD = 'ADD_CARD'

export function addCard () {
  return {
    type: ADD_CARD,
  }
}
export function saveDeck () {
  return {
    type: SAVE_DECK,
  }
}
export function receiveOneDeck (deck) {
  return {
    type: RECEIVE_ONE_DECK,
    deck,
  }
}
export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}
