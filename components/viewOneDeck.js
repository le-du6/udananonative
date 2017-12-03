import React, { Component } from 'react'
import { TouchableOpacity, FlatList, Text, View, StyleSheet, Platform, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../reducers'
import { deepBlue, middleBlue, beige, beigePlus, beigeRed, red, purple, white } from '../utils/colors'
import { Constants } from 'expo'
import { getDeck, getDecks } from '../utils/_decksData'
import { AppLoading } from 'expo'
import { connect } from 'react-redux'
import { receiveOneDeck, receiveDecks } from '../actions'
// import AddCard from './AddCard'

function SubmitBtn ({ onPress, text, color }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? [styles.iosSubmitBtn, {backgroundColor: color}] : [styles.AndroidSubmitBtn, {backgroundColor: color}]}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>{text}</Text>
    </TouchableOpacity>
  )
}

class viewOneDeck extends Component {
  state = {
    ready: false,
    entryId: 'no entryID',
    numCard: 0,
    score: 0,
  }
  componentDidMount() {
    getDeck(this.props.navigation.state.params.entryId)
    .then((deck) => this.props.dispatch(receiveOneDeck(deck)))
    .then(()=> {
      this.setState({
        ready: true,
        entryId: this.props.navigation.state.params.entryId,
        currentDeck: this.props.currentDeck,
      })
    })
  }
  render() {
    const { title = 'void', questions = [] } = (this.props.currentDeck) ? this.props.currentDeck : {}
    const nb = questions.length

    if (this.state.ready === false) {
      return <AppLoading />
    }

    return (
      <View>
          <View style={styles.decks} >
            <Text style={{fontSize: 25, textAlign: 'center'}}>
              { title }
            </Text>
          </View>
          <View style={styles.card} >
            <Text style={{fontSize: 20, color: '#777777', textAlign: 'center'}}>
              { nb } card{ (nb > 1) ? 's' : null }
            </Text>
          </View>
        <SubmitBtn text='Start Quiz' color={middleBlue}
          onPress={
          () => this.props.navigation.navigate('Quiz', {deckId: this.state.entryId})
          } />
        <SubmitBtn text='Add Card' color={purple}
          onPress={
          () => this.props.navigation.navigate('AddCard', {deckId: this.state.entryId})
          } />
      </View>
      )
  }
}

// const mapStateToProps = state => ({ currentDeck: state.currentDeck })
const mapStateToProps = ({ currentDeck }) => ({ currentDeck })
export default connect(mapStateToProps, )(viewOneDeck)

const styles = StyleSheet.create({
  card: {
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 30,
    marginBottom: 60,
    marginRight: 80,
    marginLeft: 80,
    borderLeftColor: purple,
    borderLeftWidth: 8,
    borderRightColor: purple,
    borderRightWidth: 8,
    backgroundColor: '#FDFDFD'
  },
  decks: {
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 50,
    marginBottom: 5,
    marginRight: 15,
    marginLeft: 15,
    borderLeftColor: middleBlue,
    borderLeftWidth: 15,
    // borderRightColor: '#006400',
    // borderRightWidth: 4,
    backgroundColor: '#FDFDFD'
  },
  iosSubmitBtn: {
    padding: 10,
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 7,
    height: 45,
    marginLeft: 80,
    marginRight: 80,
  },
  AndroidSubmitBtn: {
    padding: 10,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: 'center',
  },
})