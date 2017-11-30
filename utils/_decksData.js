import { AsyncStorage } from 'react-native'
import { getMetricMetaInfo, timeToString } from './helpers'
export const DECKS_STORAGE_KEY = 'myPersoDecks:decks'

export const setDecks = (data) => {
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
  return data
}

export const getDeck = (id) => {
  console.log(id)
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then((data) => {
    const res = JSON.parse(data)
    console.log('res: ', res[id])
    return res[id]
  })
  .catch((err) => {
    console.error('Pb to retreive One Deck: ', err)
  })
}

export const getDecks = () => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then((data) => {
    const res = JSON.parse(data)
    const trt = Object.keys(res).map((deck) => {
      return { key: deck, title: res[deck].title, nbQuestions: res[deck].questions.length }
    })
    return {decks: trt}
  })
  .catch(() => {
    console.error('No Decks - Fetching somes inital dummyDecks')
  })
}

// getDecks: return all of the decks along with their titles, questions, and answers.
// getDeck: take in a single id argument and return the deck associated with that id.
// saveDeckTitle: take in a single title argument and add it to the decks.
// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.