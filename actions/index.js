export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const RECEIVE_ONE_DECK = 'RECEIVE_ONE_DECK'
export const SAVE_DECK = 'SAVE_DECK'

export function saveDeck () {
  return {
    type: SAVE_DECK,
  }
}

export function receiveOneDeck (deck) {
  // console.log('RECEIVE_ONE_DECK: ', deck)
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
