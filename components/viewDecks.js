import React, { Component } from 'react'
import { TouchableOpacity, FlatList, Text, View, StyleSheet, Platform, StatusBar } from 'react-native'
import AddEntry from './AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../reducers'
import History from './History'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { deepBlue, middleBlue, beige, beigePlus, beigeRed, red, purple, white } from '../utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import EntryDetail from './EntryDetail'
import { getData, getDecks, getDeck } from '../utils/_decksData'
import { AppLoading } from 'expo'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'

const deckItem = ({ item }, navigation) => {
  return (
    <TouchableOpacity style={styles.decks} key={item.title} onPress={() => navigation.navigate(
      'AddEntry',
      { entryId: item.title }
    )} >
      <Text style={{fontSize: 25, textAlign: 'center'}}>
        { item.title }
      </Text>
      <Text style={{fontSize: 15, textAlign: 'center'}}>
        { item.length } cards
      </Text>
    </TouchableOpacity>
  )}

const vDecks = (decks, { navigation }) => {
  const data = decks.map((deck, index) => {
    return { title: deck.title, length: deck.nbQuestions }
  })
  return (
    <FlatList
      data={data}
      renderItem={x => deckItem(x, navigation)}
      keyExtractor={(v,i) => i}
    />
  )
}

class viewDecks extends Component {
  state = {
    ready: false,
  }
  componentDidMount() {
    const { dispatch } = this.props
    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ready: true})))
      .catch(() => this.setState(() => ({ready: true})))
  }
  render() {
    const decks = this.props.decks
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }

  return (
    <View>
      {vDecks(decks, this.props)}
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  decks: {
    borderColor: red,
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