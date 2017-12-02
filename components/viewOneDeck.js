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
import AddCard from './AddCard'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Add Card</Text>
    </TouchableOpacity>
  )
}

class viewOneDeck extends Component {
  state = {
    ready: false,
    entryId: 'no entryID',
    title: 'no title',
    questions: [],
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
    // console.log(this.state.title)

    if (this.state.ready === false) {
      return <AppLoading />
    }
    return (
      <View>
        <SubmitBtn onPress={
          // ()=>this.submitNewDeck(this.state.input)
          () => this.props.navigation.navigate('AddCard', {deckId: this.state.entryId})
          } />
        <View style={styles.decks} >
          <Text style={{fontSize: 25, textAlign: 'center'}}>
            entryID: { this.state.entryId }
          </Text>
        </View>
        <View style={styles.decks} >
          <Text style={{fontSize: 25, textAlign: 'center'}}>
            title: { this.state.currentDeck.title }
          </Text>
        </View>
        {this.state.currentDeck.questions.map((e,i) =>
          <View key={i}>
            <View style={styles.decks}>
              <Text style={{fontSize: 18, paddingLeft: 20, paddingRight: 20}}>
                { e.question }
              </Text>
            </View>
            <View style={styles.decks}>
              <Text style={{fontSize: 18, paddingLeft: 20, paddingRight: 20}}>
                { e.answer }
              </Text>
            </View>
          </View>
        )}
      </View>
      )
  }
}

// const mapStateToProps = state => ({ currentDeck: state.currentDeck })
const mapStateToProps = ({ currentDeck }) => ({ currentDeck })
export default connect(mapStateToProps, )(viewOneDeck)

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
  // container: {
  //   // flex: 1,
  // },
  // decks: {
  //   // flex: 1,
  //   paddingTop: 50,
  //   paddingBottom: 50,
  //   marginTop: 15,
  //   marginBottom: 15,
  //   marginRight: 15,
  //   marginLeft: 15,
  //   // borderBottomColor: beigePlus,
  //   // borderBottomWidth: 5,
  //   // backgroundColor: red,
  //   backgroundColor: '#FDFDFD',
  // },
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