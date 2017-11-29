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

class addDeck extends Component {
  state = {
    ready: false,
  }
  componentDidMount() {
    const entryId = (this.props.navigation.state.params) ? this.props.navigation.state.params.entryId : 'void'

    getDeck(entryId)
    .then((deck) => this.props.dispatch(receiveOneDeck(deck)))
    .then(()=> {
      this.setState({ready: true})
    })
  }
  render() {
    // console.log('this.props.deck from addDeck: ', this.props.deck)
    const entryId = (this.props.navigation.state.params) ? this.props.navigation.state.params.entryId : 'void'
    const title = (this.props.deck) ? this.props.deck.title : ''
    const questions = (this.props.deck['questions']) ? this.props.deck['questions'].map(x=>[x.answer, x.question]) : ''
    if (this.state.ready === false) {
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
        </Text>
        <Text style={{fontSize: 15, textAlign: 'center'}}>
          { title }
        </Text>
        {questions.map((e,i) =>
          <View style={styles.decks} key={i} >
            <Text style={{fontSize: 20, paddingLeft: 20, paddingRight: 20}} >
              { e }
            </Text>
          </View>
        )}

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
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 15,
    marginLeft: 15,
    borderLeftColor: beigeRed,
    borderLeftWidth: 15,
    backgroundColor: '#FDFDFD'
  },
})

// const mapStateToProps = decks => ({ decks })
const mapStateToProps = deck => ({ deck })

export default connect(mapStateToProps, )(addDeck)