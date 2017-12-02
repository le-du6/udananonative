import React, { Component } from 'react'
import { Button, TouchableOpacity, FlatList, Text, View, StyleSheet, Platform, StatusBar } from 'react-native'
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
    isQuestion: this.props.navigation.state.params.isQuestion || true,
    numCard: this.props.navigation.state.params.numCard || 0,
    score: this.props.navigation.state.params.score || 0,
    hadVoted: this.props.navigation.state.params.hadVoted || false,
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
    const {deckId, score, hadVoted, numCard, isQuestion} = this.state

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
            <Text style={{fontSize: 18, color: '#777777', textAlign: 'center'}}>
              Card n° { this.state.numCard + 1 } of {nb}
            </Text>
          </View>

          {this.props.currentDeck.questions.filter((x,i)=>(i===this.state.numCard)).map((e,i) =>
            <View key={i}>

              {(isQuestion) ?
              <View style={styles.QA}>
                <Text style={{fontSize: 22, paddingLeft: 20, paddingRight: 20}}>
                  { e.question }
                </Text>
              </View>
              : <View style={styles.decks}>
                <Text style={{fontSize: 22, paddingLeft: 20, paddingRight: 20}}>
                  { e.answer }
                </Text>
              </View>
              }

            </View>
          )}

          <Button title="View Answer" color={purple} onPress={
              () => { (hadVoted) ?
                this.props.navigation.navigate('Quiz', {isQuestion, deckId, score, hadVoted, numCard})
                : null
              }
            }/>

          <SubmitBtn text='Correct' color='#006400'
            onPress={ () => {
              this.setState({hadVoted: true, isQuestion: false}, () =>
              this.props.navigation.navigate('Quiz', {isQuestion, numCard, score, deckId, hadVoted: this.state.hadVoted}))
            }
            }/>
          <SubmitBtn text='Incorrect' color={red}
            onPress={
              x=>x
              // () => this.props.navigation.navigate('AddCard', {deckId: this.state.deckId})
            } />
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
  QA: {
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 65,
    marginBottom: 75,
    marginRight: 40,
    marginLeft: 40,
    borderLeftColor: red,
    borderLeftWidth: 8,
    borderRightColor: red,
    borderRightWidth: 8,
    backgroundColor: '#FDFDFD'
  },
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
    paddingTop: 10,
    paddingBottom: 10,
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