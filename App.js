import React from 'react'
import { Button, TouchableOpacity, FlatList, Text, View, StyleSheet, Platform, StatusBar } from 'react-native'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import History from './components/History'
import viewDecks from './components/viewDecks'
import viewOneDeck from './components/viewOneDeck'
import addDeck from './components/AddDeck'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { deepBlue, middleBlue, beige, beigePlus, beigeRed, red, purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import EntryDetail from './components/EntryDetail'
import { setDecks } from './utils/_decksData'
import { initialDecks } from './utils/_decksPureData'


const UdaciStatusBar = ({backgroundColor, ...props}) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}
const Tabs = TabNavigator({
  Decks: {
    screen: viewDecks,
    navigationOptions: {
      tabBarLabel: 'DECKS',
      // tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  AddDeck: {
    screen: addDeck,
    navigationOptions: {
      tabBarLabel: 'ADD DECK',
      // tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
},
{
  navigationOptions: {
    title: "All Decks",
    headerTitleStyle: {
      // flex: 1,
      fontSize: 20,
      // alignItems: "center",
      // justifyContent: "center",
    },
    headerRight: <Button title="Info" color={white} onPress={x=>x}/>,
    headerTintColor: Platform.OS === 'ios' ? white : white,
    headerStyle: {
      // flex: 1,
      // fontSize: 30,
      // alignItems: 'flex-start',
      // justifyContent: "center",
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
      headerTintColor: white,
      headerStyle: {
        backgroundColor: deepBlue,
      },
    // header: null
    // tabBarLabel: 'NEW DECK',
      // tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  }
})

export default class App extends React.Component {
  state = {
    ready: false,
  }
  componentDidMount() {
    setDecks(initialDecks);
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
  container: {
    flex: 1,
  },
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

