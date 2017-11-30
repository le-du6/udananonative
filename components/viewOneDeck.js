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
    ready: false,
    entryId: 'no entryID',
    title: 'no title',
  }
  componentDidMount() {
    getDeck(this.props.navigation.state.params.entryId)
    .then((deck) => this.props.dispatch(receiveOneDeck(deck)))
    .then(()=> {
      // console.log('this.props.currentDeck from viewOneDeck: ', this.props)
      // const {title = 'rien'} = this.props.currentDeck
      this.setState({
        ready: true,
        entryId: this.props.navigation.state.params.entryId,
        title: this.props.currentDeck.title
      })
    })
  }
  render() {
    // const entryId = (this.props.navigation.state.params) ? this.props.navigation.state.params.entryId : 'void'
    const title = (this.props.currentDeck) ? this.props.currentDeck.title : 'void title'
    console.log(this.state.title)
    // const questions = (this.props.currentDeck['questions']) ? this.props.currentDeck['questions'].map(x=>[x.answer, x.question]) : ''

    if (this.state.ready === false) {
      return <AppLoading />
    }
    return (
      <View>
        <View style={styles.decks} >
          <Text style={{fontSize: 25, textAlign: 'center'}}>
            entryID: { this.state.entryId }
          </Text>
        </View>
        <View style={styles.decks} >
          <Text style={{fontSize: 25, textAlign: 'center'}}>
            title: { this.state.title }
          </Text>
        </View>
        {/* {questions.map((e,i) =>
          <View style={styles.decks} key={i} >
            <Text style={{fontSize: 20, paddingLeft: 20, paddingRight: 20}} >
              { e }
            </Text>
          </View>
        )} */}
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
    borderLeftColor: beige,
    borderLeftWidth: 4,
    borderRightColor: beige,
    borderRightWidth: 4,
    backgroundColor: '#FDFDFD'
  },
})

// const mapStateToProps = decks => ({ decks })
const mapStateToProps = state => ({ currentDeck: state.currentDeck })

export default connect(mapStateToProps, )(viewOneDeck)