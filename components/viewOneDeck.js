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
import { getData, getDecks, getDecks2 } from '../utils/_decksData'
import { AppLoading } from 'expo'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'

const deckItem = (entryId, navigation) => {
  return (
    <TouchableOpacity style={styles.decks} onPress={() => navigation.navigate(
      'AddEntry',
      { entryId: item.title }
    )} >
      <Text style={{fontSize: 25, textAlign: 'center'}}>
        {/* { item.title } */}
        { entryId }
      </Text>
      {/* <Text style={{fontSize: 15, textAlign: 'center'}}>
        { item.length } cards
      </Text> */}
    </TouchableOpacity>
  )}

class viewOneDeck extends Component {
  state = {
    ready: true,
  }
  componentDidMount() {

  }
  render() {
    const { ready } = this.state
    const entryId = (this.props.navigation.state.params) ? this.props.navigation.state.params.entryId : 'void'
    console.log('entryId: ',entryId)

    if (ready === false) {
      return <AppLoading />
    }

  return (
    <View>
      {deckItem(entryId, this.props)}
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

const mapStateToProps = decks => ({ decks })

export default connect(mapStateToProps, )(viewOneDeck)