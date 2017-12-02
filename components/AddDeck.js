import React, { Component } from 'react'
import { Button, KeyboardAvoidingView, TextInput, TouchableOpacity, FlatList, Text, View, StyleSheet, Platform, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../reducers'
import { deepBlue, middleBlue, beige, beigePlus, beigeRed, red, purple, white } from '../utils/colors'
import { Constants } from 'expo'
import { getDeck, getDecks, saveDeckTitle } from '../utils/_decksData'
import { AppLoading } from 'expo'
import { connect } from 'react-redux'
import { receiveOneDeck, receiveDecks, saveDeck } from '../actions'
import TextButton from './TextButton'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Add Deck</Text>
    </TouchableOpacity>
  )
}

class addDeck extends Component {
  state = {
    ready: true,
    input: ''
  }
  handleTextChange = (input) => {
    this.setState({ input }, x => {
      // console.log(this.state.input)
    })
  }
  submitNewDeck = (input) => {
    (input.trim() !== '') ? (
    saveDeckTitle(input)
      .then((deck) => {
        this.props.dispatch(saveDeck())
        this.setState({input: ''})
      })
      .then(() => getDecks()
                    .then((decks) => {
                      this.props.dispatch(receiveDecks(decks))
                      this.props.navigation.navigate( 'AllDecks')
                    }
                  ))
    ) : null
  }
  componentDidMount() {
  }
  render() {
    if (this.state.ready === false) {
      return <AppLoading />
    }
    return (
      <KeyboardAvoidingView>
        <View style={styles.decks} >
          <Text style={{color: '#828282',fontSize: 25, textAlign: 'center'}}>
            Enter a new deck name
          </Text>
          <View style={styles.inputText} >
            <TextInput
              value={this.state.input}
              onChangeText={this.handleTextChange}
              style={{fontSize: 30, textAlign: 'center', backgroundColor: white}}>
            </TextInput>
          </View>
          <SubmitBtn onPress={()=>this.submitNewDeck(this.state.input)} />
        </View>
      </KeyboardAvoidingView>
      )
  }
}

const mapStateToProps = state => ({ decks: state.decks })

export default connect(mapStateToProps, )(addDeck)

const styles = StyleSheet.create({
  iosSubmitBtn: {
    backgroundColor: red,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 80,
    marginRight: 80,
  },
  AndroidSubmitBtn: {
    backgroundColor: red,
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
    // backgroundColor: red,
    backgroundColor: '#FDFDFD',
  },
  inputText: {
    // paddingTop: 50,
    // paddingBottom: 50,
    marginTop: 25,
    marginBottom: 35,
    marginRight: 45,
    marginLeft: 45,
    borderBottomColor: red,
    borderBottomWidth: 2,
    backgroundColor: '#FDFDFD'
  },
})

