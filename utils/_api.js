import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'
import { initialDecks } from '../utils/_decksPureData'

// export const DECKS_STORAGE_KEY = 'myPersoDecks:001'
export const DECKS_STORAGE_KEY = 'myPersoDecks:002'
export const NOTIFICATION_KEY = 'myPersoDecks:NOTIFICATION_KEY'

export const timeToString = (time = Date.now()) => {
  const date = new Date(time)
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return todayUTC.toISOString().split('T')[0]
}

export const clearLocalNotification = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

const createNotification = () => {
  return {
    title: 'Train yourself with Cards Deck!',
    body: "👋 Don't forget to train your prefered Deck!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              // tomorrow.setDate(tomorrow.getDate())
              tomorrow.setHours(12)
              // tomorrow.setHours(tomorrow.getHours())
              tomorrow.setMinutes(0)
              // tomorrow.setMinutes(tomorrow.getMinutes() + 1)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

export const setDecks = (data) => {
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
  return data
}

export const addCardToDeck =(deckID, card) => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((data) => {
      const decks = JSON.parse(data)
      const deck = decks[deckID]
      const { title, questions } = deck
      return AsyncStorage.mergeItem(DECKS_STORAGE_KEY,JSON.stringify(
        { [deckID]: { title, questions: [...questions, card] } }
      )).then(data => console.log('res from addCardToDeck: ', JSON.parse(data)))
    })
}

export const saveDeckTitle =(title) => {
  const titleKey = title.trim().split(' ').join('')

  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [titleKey]: { title: title.trim(), questions: [] }
  })).then(x => titleKey)
}

export const getDeck = (id) => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then((data) => {
    const res = JSON.parse(data)
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
    console.log(setDecks(initialDecks))
    console.error('No Decks - Fetching somes inital dummyDecks')
  })
}

// getDecks: return all of the decks along with their titles, questions, and answers.
// getDeck: take in a single id argument and return the deck associated with that id.
// saveDeckTitle: take in a single title argument and add it to the decks.
// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.