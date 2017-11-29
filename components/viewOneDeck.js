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
import { getDeck, getDecks } from '../utils/_decksData'
import { AppLoading } from 'expo'
import { connect } from 'react-redux'
import { receiveOneDeck, receiveDecks } from '../actions'

class viewOneDeck extends Component {
  state = {
    ready: true,
  }
  componentDidMount() {
    const entryId = (this.props.navigation.state.params) ? this.props.navigation.state.params.entryId : 'void'

    getDeck(entryId)
      .then((deck) => this.props.dispatch(receiveOneDeck(deck)))
  }
  render() {
    const { ready } = this.state
    const entryId = (this.props.navigation.state.params) ? this.props.navigation.state.params.entryId : 'void'
    console.log('this.props from viewOneDeck: ', this.props)
    console.log('key from viewOneDeck: ', entryId)
    console.log('deck from viewOneDeck: ', this.props.deck)

    if (ready === false) {
      return <AppLoading />
    }

  return (
    <View>
      {/* <TouchableOpacity style={styles.decks} onPress={() => navigation.navigate(
      'AddEntry',
      { entryId: item.title }
      )} > */}
      <Text style={{fontSize: 25, textAlign: 'center'}}>
        { entryId }
        { this.props.deck.title }
        { this.props.deck.questions }
      </Text>
      <Text style={{fontSize: 15, textAlign: 'center'}}>
        {/* { item.length } cards */}
      </Text>
      {/* </TouchableOpacity> */}
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

// const mapStateToProps = decks => ({ decks })
const mapStateToProps = deck => ({ deck })

export default connect(mapStateToProps, )(viewOneDeck)