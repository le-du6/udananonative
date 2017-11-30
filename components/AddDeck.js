import React, { Component } from 'react'
import { Button, KeyboardAvoidingView, TextInput, TouchableOpacity, FlatList, Text, View, StyleSheet, Platform, StatusBar } from 'react-native'
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
import TextButton from './TextButton'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Add New Deck</Text>
    </TouchableOpacity>
  )
}

class addDeck extends Component {
  state = {
    ready: true,
    input: ''
  }
  handleTextChange = (input) => {
    console.log()
    this.setState({ input }, x=>console.log(this.state.input) )
  }
  componentDidMount() {

    // const entryId = (this.props.navigation.state.params) ? this.props.navigation.state.params.entryId : 'void'

    // getDeck(entryId)
    // .then((deck) => this.props.dispatch(receiveOneDeck(deck)))
    // .then(()=> {
    //   this.setState({ready: true})
    // })
  }
  render() {
    // // console.log('this.props.deck from addDeck: ', this.props.deck)
    // const entryId = (this.props.navigation.state.params) ? this.props.navigation.state.params.entryId : 'void'
    // const title = (this.props.deck) ? this.props.deck.title : ''
    // const questions = (this.props.deck['questions']) ? this.props.deck['questions'].map(x=>[x.answer, x.question]) : ''
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

          <SubmitBtn onPress={this.submit} />

        </View>
      </KeyboardAvoidingView>
      )
  }
}

const styles = StyleSheet.create({
  iosSubmitBtn: {
    backgroundColor: beigePlus,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 80,
    marginRight: 80,
  },
  AndroidSubmitBtn: {
    backgroundColor: beigePlus,
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
    borderBottomColor: beigePlus,
    borderBottomWidth: 2,
    backgroundColor: '#FDFDFD'
  },
})

// const mapStateToProps = decks => ({ decks })
const mapStateToProps = deck => ({ deck })

export default connect(mapStateToProps, )(addDeck)