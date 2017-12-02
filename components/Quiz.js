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

class Quiz extends Component {
  state = {
    ready: false,
    deckId: 'no deckId',
    numCard: this.props.navigation.state.params.numCard || 0,
    score: this.props.navigation.state.params.score || 0,
  }
  componentDidMount() {
    console.log(this.props.navigation.state)

    getDeck(this.props.navigation.state.params.deckId)
    .then((deck) => this.props.dispatch(receiveOneDeck(deck)))
    .then(()=> {
      this.setState({
        ready: true,
        deckId: this.props.navigation.state.params.deckId,
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

    return (this.state.numCard < nb) ? (
      <View>
          <View style={styles.decks} >
            <Text style={{fontSize: 25, textAlign: 'center'}}>
              { title }
            </Text>
          </View>
          <View style={styles.card} >
            <Text style={{fontSize: 20, color: '#777777', textAlign: 'center'}}>
              Card n° { this.state.numCard + 1 } of {nb}
            </Text>
          </View>
        <SubmitBtn text='Correct' color='#006400'
          onPress={ () => this.props.navigation.navigate('Quiz',
           {deckId: this.state.deckId, numCard: this.state.numCard + 1, score: this.state.score }
           )}/>
        <SubmitBtn text='Incorrect' color={red}
          onPress={
            x=>x
            // () => this.props.navigation.navigate('AddCard', {deckId: this.state.deckId})
          } />

        {/* <View style={styles.decks} >
          <Text style={{fontSize: 25, textAlign: 'center'}}>
            entryID: { this.state.deckId }
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
      ) : (
        <View style={styles.decks} >
          <Text style={{fontSize: 25, textAlign: 'center'}}>
            Your score { this.state.score }
          </Text>
      </View>
      )
  }
}

// const mapStateToProps = state => ({ currentDeck: state.currentDeck })
const mapStateToProps = ({ currentDeck }) => ({ currentDeck })
export default connect(mapStateToProps, )(Quiz)

const styles = StyleSheet.create({
  card: {
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 15,
    marginBottom: 0,
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
    marginTop: 5,
    marginBottom: 0,
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