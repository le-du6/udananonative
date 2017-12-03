import React, { Component } from 'react'
import { Button, TouchableOpacity, FlatList, Text, View, StyleSheet, Platform, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { AppLoading, Constants } from 'expo'
import { receiveOneDeck, receiveDecks } from '../actions'
import reducer from '../reducers'
import { getDeck, getDecks } from '../utils/_api'
import { setLocalNotification, clearLocalNotification } from '../utils/_api'

import { deepGreen, deepBlue, middleBlue, beige, beigePlus, beigeRed, red, purple, white } from '../utils/colors'

const SubmitBtn = ({ onPress, text, color }) => {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? [styles.iosSubmitBtn, {backgroundColor: color}] : [styles.AndroidSubmitBtn, {backgroundColor: color}]}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>{text}</Text>
    </TouchableOpacity>
  )
}

const onPressQorA = (navigation, isAnswer, hadVoted, deckId, score, numCard, replay) => {
  (hadVoted)
    ? (!isAnswer)
        ? navigation.navigate('Quiz', { isAnswer: true, deckId, score, hadVoted, numCard, replay })
        : navigation.goBack()
    : null
}

class Quiz extends Component {
  state = {
    replay: this.props.navigation.state.params.replay || 1,
    initialKey: null,
    ready: false,
    deckId: 'no deckId',
    isAnswer: this.props.navigation.state.params.isAnswer,
    numCard: this.props.navigation.state.params.numCard || 0,
    score: this.props.navigation.state.params.score || {},
    hadVoted: this.props.navigation.state.params.hadVoted || false,
  }
  componentDidMount() {
    this.setState({initialKey: this.props.navigation.state.key})

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
    const { replay, initialKey, deckId, score, hadVoted, numCard, isAnswer } = this.state
    const { navigation } = this.props

    // console.log('Componente State: ', this.state)
    // console.log('Navigation STATE: ', this.props.navigation.state)
    // console.log('initialKey: ', this.state.initialKey)
    // console.log('replay: ', this.state.replay)

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
            <Text style={{fontSize: 18, color: '#777777', textAlign: 'center'}}>
              {(!isAnswer) ? "Question" : "Answer"}
            </Text>
          </View>

          {this.props.currentDeck.questions.filter((x,i)=>(i===this.state.numCard)).map((e,i) =>
            <View key={i}>

              {(!isAnswer) ?
              <View style={[styles.QA, {borderLeftColor: red}, {borderRightColor: red}]}>
                <Text style={{fontSize: 22, paddingLeft: 20, paddingRight: 20}}>
                  { e.question }
                </Text>
              </View>
              : <View style={[styles.QA, {borderLeftColor: deepGreen}, {borderRightColor: deepGreen}]}>
                <Text style={{fontSize: 22, paddingLeft: 20, paddingRight: 20}}>
                  { e.answer }
                </Text>
              </View>
              }

            </View>
          )}

          <Button
            title={(!isAnswer)
                      ? (hadVoted)
                        ? "View Answer"
                        : "View Answer (Vote before!)"
                      : "Back to the Question"}
            color={purple}
            onPress={() => onPressQorA(navigation, isAnswer, hadVoted, deckId, score, numCard, replay)}
            />

          <SubmitBtn text='Correct' color={deepGreen}
            onPress={ () => {
              (!isAnswer)
                ? this.setState( { score: { ...score, [numCard+'-q']: 'correct' }, hadVoted: true })
                : this.setState( { score: { ...score, [numCard+'-a']: 'correct' } },
                    () => this.props.navigation.navigate('Quiz', {
                      hadVoted: false,
                      isAnswer: false,
                      numCard: numCard + 1,
                      score: this.state.score, deckId,
                      replay
                    })
                  )
            }
            }/>
          <SubmitBtn text='Incorrect' color={red}
            onPress={ () => {
              (!isAnswer)
                ? this.setState( { score: { ...score, [numCard+'-q']: 'incorrect' }, hadVoted: true })
                : this.setState( { score: { ...score, [numCard+'-a']: 'incorrect' } },
                    () => this.props.navigation.navigate('Quiz', {
                      hadVoted: false,
                      isAnswer: false,
                      numCard: numCard + 1,
                      score: this.state.score, deckId,
                      replay
                    })
                  )
            }
            }/>
      </View>
      ) : (
        <View style={styles.decks} >
          <Text style={{fontSize: 25, textAlign: 'center', paddingBottom: 30}}>
            Your score is { scoring(this.state.score).filter(x=>(x === true)).length }/{nb}
          </Text>
          {scoring(this.state.score).map((x, i) => (
            <Text key={i} style={{fontSize: 18, textAlign: 'left', paddingLeft: 20}}>
                Answer n° {i} is {(x) ? 'Correct' : 'Incorrect'}
            </Text>)
          )}
          <SubmitBtn text='Play Again' color={deepGreen}
            onPress={() => {
              clearLocalNotification().then(setLocalNotification)
              this.props.navigation.navigate('Quiz', { deckId, replay: replay + 1 })}
            }
            />
          <SubmitBtn text='Back to Deck' color={purple}
            onPress={() => {
              clearLocalNotification().then(setLocalNotification)
              this.props.navigation.goBack(keying(initialKey, nb, replay))}
            }
            />
        </View>
      )
  }
}

const keying = (key, nbCards, replay) => {
  const keySuffix = key.split('-').slice(-1)
  const keyPrefix = key.split('-').slice(0,-1).join('-')
  const page = parseInt(keySuffix[0], 10) - (nbCards*2*replay) - (replay-1)
  // console.log('key: ', keyPrefix + '-' + page.toString())
  return keyPrefix + '-' + page.toString()
}

const scoring = (scoreObj) => {
    const res = Object.keys(scoreObj)
      .reduce((acc, x) => {
        return { ...acc, [x[0]]: (acc[x[0]]) ? [acc[x[0]]].concat(scoreObj[x]) : scoreObj[x] }
      }, {})

    return Object.keys(res).map(x => res[x][0] === res[x][1])
}

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
    borderLeftWidth: 8,
    borderRightWidth: 8,
    backgroundColor: '#FDFDFD'
  },
  card: {
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 5,
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
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 60,
    marginRight: 60,
    height: 45,
    borderRadius: 2,
    justifyContent: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
  },
})