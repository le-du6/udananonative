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
          <View style={styles.decks} >
            <Text style={{fontSize: 25, textAlign: 'center'}}>
              { nb } card{ (nb > 1) ? 's' : null }
            </Text>
          </View>
        <SubmitBtn text='Start Quiz' color='#006400'
          onPress={
          () => this.props.navigation.navigate('AddCard', {deckId: this.state.entryId})
          } />
        <SubmitBtn text='Add Card' color={purple}
          onPress={
          () => this.props.navigation.navigate('AddCard', {deckId: this.state.entryId})
          } />

        {/* <View style={styles.decks} >
          <Text style={{fontSize: 25, textAlign: 'center'}}>
            entryID: { this.state.entryId }
          </Text>
        </View> */}
        {/* {this.props.currentDeck.questions.map((e,i) =>
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
        )} */}
      </View>
      )
  }
}

// const mapStateToProps = state => ({ currentDeck: state.currentDeck })
const mapStateToProps = ({ currentDeck }) => ({ currentDeck })
export default connect(mapStateToProps, )(viewOneDeck)

const styles = StyleSheet.create({
  decks: {
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 15,
    marginLeft: 15,
    borderLeftColor: '#006400',
    borderLeftWidth: 4,
    borderRightColor: '#006400',
    borderRightWidth: 4,
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