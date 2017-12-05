import React, { Component } from 'react'
import { TouchableOpacity, FlatList, Text, View, StyleSheet, Platform, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { Constants, AppLoading } from 'expo'
import reducer from '../reducers'
import { receiveDecks } from '../actions'
import { setDecks, getDecks, getDeck } from '../utils/_api'
import { clearLocalNotification, setLocalNotification } from '../utils/_api'
import { DECKS_STORAGE_KEY } from '../utils/_api'
import { AsyncStorage } from 'react-native'
import { deepBlue, middleBlue, beige, beigePlus, beigeRed, red, purple, white } from '../utils/colors'
import { initialDecks } from '../utils/_decksPureData'

const deckItem = ({ key, title, nbQuestions }, navigation) => {
  return (
    <TouchableOpacity style={styles.decks} key={key} onPress={() => navigation.navigate(
      'ViewOneDeck',
      { entryId: key }
    )} >
      <Text style={{fontSize: 25, textAlign: 'center'}}>
        { title }
      </Text>
      <Text style={{fontSize: 15, textAlign: 'center'}}>
        { nbQuestions } card{ (nbQuestions > 1) ? 's' : null }
      </Text>
    </TouchableOpacity>
  )}

const vDecks = (decks, { navigation }) => {
  const data = decks.map((deck, index) => {
    return deck
  })
  return (
    <FlatList
      data={data}
      renderItem={deck => deckItem(deck.item, navigation)}
      keyExtractor={(v,i) => i}
    />
  )
}

class viewDecks extends Component {
  state = {
    ready: false,
  }
  componentWillMount() {
    clearLocalNotification().then(setLocalNotification)

    AsyncStorage.getAllKeys()
      .then(keys => {
          console.log('keys: ', keys)
          // return AsyncStorage.multiRemove(keys)
          return (!keys.includes(DECKS_STORAGE_KEY))
            ? setDecks(initialDecks)
                .then(() => {
                  getDecks()
                  .then((decks) => this.props.dispatch(receiveDecks(decks)))
                  .then(() => this.setState(() => ({ready: true})))
                  .catch((error) => console.error(error))
                })
                .catch((error) => console.error(error))
            : getDecks()
                .then((decks) => this.props.dispatch(receiveDecks(decks)))
                .then(() => this.setState(() => ({ready: true})))
                .catch((error) => console.error(error))
      })
  }
  componentDidMount() {
    // getDecks()
    //   .then((decks) => this.props.dispatch(receiveDecks(decks)))
    //   .then(() => this.setState(() => ({ready: true})))
    //   .catch((error) => console.error(error))
  }
  render() {

    if (this.state.ready === false) {
      return <AppLoading />
    }
    return (
      <View>
        {vDecks(this.props.decks, this.props)}
      </View>
      )
  }
}

const styles = StyleSheet.create({
  decks: {
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 15,
    marginLeft: 15,
    borderLeftColor: middleBlue,
    borderLeftWidth: 15,
    backgroundColor: '#FDFDFD'
  },
})

const mapStateToProps = state => state

export default connect(mapStateToProps, )(viewDecks)