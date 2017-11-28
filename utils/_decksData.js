// Utilities for backfilling the calendar.

import { AsyncStorage } from 'react-native'
import { getMetricMetaInfo, timeToString } from './helpers'
import { initialDecks } from './_decksPureData'
export const DECKS_STORAGE_KEY = 'myPersoDecks:decks'

// export const setDecks = (data) => {
//   AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
//   return data
// }

export const getDeck = (id) => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then((data) => {
    const res = JSON.parse(data)
    console.log('res: ', res[id])
    return res[id]
  })
  .catch(() => {
    console.log('No Decks - Fetching somes inital dummyDecks')
    // return initialDecks
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
    console.log('No Decks - Fetching somes inital dummyDecks')
    // return initialDecks
  })
}

// export const getDecks2 = async () => {
//   // try {
//     const value = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
//     if (value !== null){
//       // We have data!!
//       console.log(value);
//       return value
//     }
// //   } catch (error) {
// //     console.error('No Decks - Fetching somes inital dummyDecks', error)
// // }
// }


// getDecks: return all of the decks along with their titles, questions, and answers.
// getDeck: take in a single id argument and return the deck associated with that id.
// saveDeckTitle: take in a single title argument and add it to the decks.
// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.