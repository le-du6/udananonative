import React, { Component } from 'react'
import { Button, TouchableOpacity, FlatList, Text, View, StyleSheet, Platform, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../reducers'
import { deepGreen, deepBlue, middleBlue, beige, beigePlus, beigeRed, red, purple, white } from '../utils/colors'
import { Constants } from 'expo'
import { getDeck, getDecks } from '../utils/_decksData'
import { AppLoading } from 'expo'
import { connect } from 'react-redux'
import { receiveOneDeck, receiveDecks } from '../actions'

const SubmitBtn = ({ onPress, text, color }) => {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? [styles.iosSubmitBtn, {backgroundColor: color}] : [styles.AndroidSubmitBtn, {backgroundColor: color}]}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>{text}</Text>
    </TouchableOpacity>
  )
}

const onPressQorA = (navigation, isAnswer, hadVoted, deckId, score, numCard) => {
  (hadVoted)
    ? (!isAnswer)
        ? navigation.navigate('Quiz', { isAnswer: true, deckId, score, hadVoted, numCard })
        : navigation.goBack()
    : null
}

class Quiz extends Component {
  // const {deckId, score, hadVoted, numCard, isAnswer} = this.state

  state = {
    ready: false,
    deckId: 'no deckId',
    isAnswer: this.props.navigation.state.params.isAnswer,
    numCard: this.props.navigation.state.params.numCard || 0,
    score: this.props.navigation.state.params.score || {},
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
    const { deckId, score, hadVoted, numCard, isAnswer } = this.state
    const { navigation } = this.props

    console.log('Componente State: ', this.state)
    console.log('Navigation STATE: ', this.props.navigation.state)

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
            title={(!isAnswer) ? "View Answer" : "View Question"}
            color={purple}
            onPress={() => onPressQorA(navigation, isAnswer, hadVoted, deckId, score, numCard)}
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
                      score: this.state.score, deckId
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
                      score: this.state.score, deckId
                    })
                  )
            }
            }/>
      </View>
      ) : (
        <View style={styles.decks} >
          <Text style={{fontSize: 25, textAlign: 'center', paddingBottom: 30}}>
            Your score is { scoring(this.state.score).filter(x=>(x === true)).length }
          </Text>
          {scoring(this.state.score).map((x, i) => (
            <Text key={i} style={{fontSize: 18, textAlign: 'left', paddingLeft: 20}}>
                Question n° {i} is {x.toString()}
            </Text>)
          )}
      </View>
      )
  }
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
    // borderLeftColor: red,
    borderLeftWidth: 8,
    // borderRightColor: red,
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