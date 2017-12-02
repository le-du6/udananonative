import React, { Component } from 'react'
import { TouchableOpacity, FlatList, Text, View, StyleSheet, Platform, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../reducers'
import { deepBlue, middleBlue, beige, beigePlus, beigeRed, red, purple, white } from '../utils/colors'
import { Constants } from 'expo'
import { getData, getDecks, getDeck } from '../utils/_decksData'
import { AppLoading } from 'expo'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'

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
    // console.log('one by one :', deck)
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
  componentDidMount() {
    // console.log(this.props)
    getDecks()
      .then((decks) => this.props.dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ready: true})))
      .catch(() => this.setState(() => ({ready: true})))
  }
  render() {
    console.log(this.props)

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
  container: {
    // flex: 1,
  },
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

const mapStateToProps = state => {
  // console.log( state )
  return state
}

export default connect(mapStateToProps, )(viewDecks)