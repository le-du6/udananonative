import React from 'react'
import { Button, TouchableOpacity, FlatList, Text, View, StyleSheet, Platform, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import viewDecks from './components/viewDecks'
import viewOneDeck from './components/viewOneDeck'
import addDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import Quiz from "./components/Quiz"
import { TabNavigator, StackNavigator } from 'react-navigation'
import { deepBlue, middleBlue, beige, beigePlus, beigeRed, red, purple, white } from './utils/colors'
import { Constants } from 'expo'
import { setDecks } from './utils/_api'
import { initialDecks } from './utils/_decksPureData'

const UdaciStatusBar = ({backgroundColor, ...props}) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}
const Tabs = TabNavigator({
  AllDecks: {
    screen: viewDecks,
    navigationOptions: {
      title: 'All Decks',
      tabBarLabel: 'DECKS',
    },
  },
  AddDeck: {
    screen: addDeck,
    navigationOptions: {
      title: 'New Deck',
      tabBarLabel: 'NEW DECK',
    },
  },
},
{
  navigationOptions: {
    headerTitleStyle: {
      fontSize: 20,
    },
    // headerRight: <Button title="Info" color={white} onPress={x=>x}/>,
    headerTintColor: Platform.OS === 'ios' ? white : white,
    headerStyle: {
      backgroundColor: Platform.OS === 'ios' ? deepBlue : deepBlue,
    },
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? deepBlue : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : deepBlue,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    },
    labelStyle: {
      fontSize: 22,
    },
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  ViewOneDeck: {
    screen: viewOneDeck,
    navigationOptions: {
      title: 'Deck',
      // title: this.props.currentDeck.title,
      headerTintColor: white,
      headerStyle: {
        backgroundColor: deepBlue,
      },
    },
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'New Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: deepBlue,
      },
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: deepBlue,
      },
    },
  },
})

export default class App extends React.Component {
  state = {
    ready: false,
    title: 'Default',
  }

  componentWillMount() {
    // setDecks(initialDecks);
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={deepBlue} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  decks: {
    borderColor: red,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 15,
    marginLeft: 15,
    borderLeftColor: middleBlue,
    borderLeftWidth: 15,
    backgroundColor: '#FDFDFD'
  },
})

