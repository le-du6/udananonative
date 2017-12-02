import React, { Component } from 'react'
import { Button, KeyboardAvoidingView, TextInput, TouchableOpacity, FlatList, Text, View, StyleSheet, Platform, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../reducers'
import { deepBlue, middleBlue, beige, beigePlus, beigeRed, red, purple, white } from '../utils/colors'
import { Constants } from 'expo'
import { getDeck, getDecks, saveDeckTitle, addCardToDeck } from '../utils/_decksData'
import { AppLoading } from 'expo'
import { connect } from 'react-redux'
import { receiveOneDeck, receiveDecks, saveDeck, addCard } from '../actions'
import TextButton from './TextButton'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Add Card</Text>
    </TouchableOpacity>
  )
}

class AddCard extends Component {
  state = {
    ready: true,
    newCard: {
      question: '',
      answer: '',
    },
  }
  handleTextChangeQ = (question) => {
    this.setState( { newCard: {...this.state.newCard, question} }, x => {
      console.log(this.state.newCard)
    })
  }
  handleTextChangeA = (answer) => {
    this.setState( { newCard: {...this.state.newCard, answer} }, x => {
      console.log(this.state.newCard)
    })
  }
  submitNewCard = (card) => {
    (card.question.trim() !== '' && card.answer.trim() !== '') ? (
      addCardToDeck(this.props.navigation.state.params.deckId,
        {question: card.question.trim(), answer: card.answer.trim()}
      )
      .then((deck) => {
        this.props.dispatch(addCard())
        this.setState( {newCard: { question: '', answer: ''}})
      })
      .then(() => getDecks()
                    .then((decks) => this.props.dispatch(receiveDecks(decks)))
                    .then(() => getDeck(this.props.navigation.state.params.deckId)
                    .then((deck) => {
                      this.props.dispatch(receiveOneDeck(deck))

                    }))
                    .then(()=>this.props.navigation.goBack())
                )
    ) : null
  }
  componentDidMount() {
    // console.log( 'componentDidMount', this.props.navigation.state.params.deckId)
  }
  render() {
    if (this.state.ready === false) {
      return <AppLoading />
    }
    return (
      <KeyboardAvoidingView>
        <View style={styles.decks} >
          <Text style={{color: '#828282',fontSize: 20, textAlign: 'center'}}>
            Enter a new question
          </Text>
          <View style={styles.inputText} >
            <TextInput
              value={this.state.newCard.question}
              onChangeText={this.handleTextChangeQ}
              style={{fontSize: 20, textAlign: 'center', backgroundColor: white}}>
            </TextInput>
          </View>

          <Text style={{color: '#828282',fontSize: 20, textAlign: 'center'}}>
            Enter the correct answer
          </Text>
          <View style={styles.inputText} >
            <TextInput
              value={this.state.newCard.answer}
              onChangeText={this.handleTextChangeA}
              style={{fontSize: 20, textAlign: 'center', backgroundColor: white}}>
            </TextInput>
          </View>

          <SubmitBtn onPress={
            ()=>this.submitNewCard(this.state.newCard)
            // () => this.props.navigation.navigate('AddCard')
            } />
        </View>
      </KeyboardAvoidingView>
      )
  }
}

const mapStateToProps = ({decks, currentDeck}) => ({decks, currentDeck})
export default connect(mapStateToProps, )(AddCard)

const styles = StyleSheet.create({
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 80,
    marginRight: 80,
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
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
  container: {
    // flex: 1,
  },
  decks: {
    // flex: 1,
    paddingTop: 50,
    paddingBottom: 50,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 15,
    marginLeft: 15,
    // borderBottomColor: beigePlus,
    // borderBottomWidth: 5,
    // backgroundColor: purple,
    backgroundColor: '#FDFDFD',
  },
  inputText: {
    // paddingTop: 50,
    // paddingBottom: 50,
    marginTop: 25,
    marginBottom: 35,
    marginRight: 45,
    marginLeft: 45,
    borderBottomColor: purple,
    borderBottomWidth: 2,
    backgroundColor: '#FDFDFD'
  },
})

