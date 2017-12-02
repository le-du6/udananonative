import { AsyncStorage } from 'react-native'
export const DECKS_STORAGE_KEY = 'myPersoDecks:decks'

export const setDecks = (data) => {
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
  return data
}

// title = String
// card = Object = {question: String, answer: String}
export const addCardToDeck =(title, card) => {
  // console.log('from addCardToDeck: ', title)
  // const titleKey = title.trim().split(' ').join('')
  // console.log('from after addCardToDeck: ', titleKey)

  AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((data) => {
      const decks = JSON.parse(data)
      const deck = decks[title]
      const { questions } = deck
      AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: { title, questions: [...questions, ...card] }
      })).then(data => console.log('res from addCardToDeck: ', JSON.parse(data)))
    })
}

export const saveDeckTitle =(title) => {
  // console.log('from saveDeckTitle: ', title)
  const titleKey = title.trim().split(' ').join('')
  // console.log('from after saveDeckTitle: ', titleKey)

  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [titleKey]: { title: title.trim(), questions: [] }
  })).then(data=>console.log(JSON.parse(data)))
}

export const getDeck = (id) => {
  // console.log(id)
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then((data) => {
    const res = JSON.parse(data)
    // console.log('res: ', res[id])
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